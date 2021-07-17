export { Airrow };

import { Compass } from "./compass.js";

class Airrow {

    constructor(apiServer) {
        this.latestPosition = null;
        this.latestOrientation = null;
        this.latestPositionState = null;
        this.sessionId = null;
        this.status = "";
        this.apiServer = apiServer;
        this.compass = new Compass();
        this.orientationOffset = 0;

        this.geoPositionWatch = null;
        this.positionStateWatch = null;
        

        this.geoLocationOptions = {
            enableHighAccuracy: true,
            timeout: 2000
        };

        // there can only be one
        this.geoPermissionUpdateHandler = null;
        this.orientationPermissionUpdateHandler = null;

        this.hasOrientationEventHandler = false;
    }

    registerGeoPermissionUpdate(fun) {
        this.geoPermissionUpdateHandler = fun;
    }

    registerOrientationPermissionUpdate(fun) {
        this.orientationPermissionUpdateHandler = fun;
    }

    checkGeoPermission(fun) {
        if (navigator.permissions === undefined) {
			fun(false);
            this.registerGeoPermissionUpdate(fun);
		} else {
            let that = this;
			navigator.permissions
				.query({ name: "geolocation" })
				.then(function (result) {
					if (result.state == "granted") {
						fun(true);
					} else if (result.state == "prompt") {
						that.registerGeoPermissionUpdate(fun);
					} else if (result.state == "denied") {
						fun(false);
					}

					result.onchange = function () {
						if (result.state == "granted") {
							fun(true);
						}
					};
				}
            );
		}
    }

    checkOrientationPermission(fun) {
        if ( typeof( DeviceOrientationEvent ) !== "undefined" && typeof( DeviceOrientationEvent.requestPermission ) === "function" ) {
            fun(false);
            this.registerOrientationPermissionUpdate(fun);
        } else {
            fun(true);
		}
    }

    startGeo() {
        if ( this.geoPositionWatch !== null ) return;

        this.geoPositionWatch = navigator.geolocation.watchPosition(
            this.updateCoordinates.bind(this),
            this.noGeoPositionAvailable.bind(this),
            this.geoLocationOptions);

        this.positionStateWatch = window.setInterval(this.refreshPositionState.bind(this), 1000);
    }

    startOrientation() {
        if ( this.hasOrientationEventHandler === true ) return;

        if ('ondeviceorientationabsolute' in window) {
            // works only in Chrome
            window.addEventListener('deviceorientationabsolute', this.updateOrientation.bind(this));
            this.hasOrientationEventHandler = true;
        } else if ('ondeviceorientation' in window) {
            if (this.orientationPermissionUpdateHandler === null) {
                // we don't need to request permission (Firefox)
                window.addEventListener('deviceorientation', this.updateOrientation.bind(this));
                this.hasOrientationEventHandler = true;
            } else {
                DeviceOrientationEvent.requestPermission()
                    .then(response => {
                        if (response === 'granted') {
                            window.addEventListener('deviceorientation', this.updateOrientation.bind(this));
                            this.hasOrientationEventHandler = true;
                        } else {
                            console.log("Orientation Response ", response);
                            this.orientationPermissionUpdateHandler(false);
                        }})
                    .catch(err => {
                        console.log("Err ", err);
                        this.orientationPermissionUpdateHandler(false);
                    });
            }
        }
    }

    startCompass() {
        this.compass.start();
        this.compass.register(this.refreshOffset.bind(this));
    }

    refreshOffset(summary) {
        this.orientationOffset = Math.round(summary.northOffset);
      }

    updateCoordinates(position) {
        if (this.geoPermissionUpdateHandler !== null) {
            this.geoPermissionUpdateHandler(true);
            this.geoPermissionUpdateHandler = null;
        }
        this.latestPosition = position;

        this.refreshPositionState();
    }

    refreshPositionState() {
        // skip if we have collected data in the last second
        if (this.latestPositionState !== null && this.latestPositionState.lastUpdate && (Date.now() - this.latestPositionState.lastUpdate < 1000)) return;

        // skip if no position data
        if (this.latestPosition === null) return;

        const that = this;
        const params = {
            "uuid": this.sessionId,
            "location": {
              "lat": this.latestPosition.coords.latitude,
              "lon": this.latestPosition.coords.longitude
            },
            "status": this.status,
            "accuracy": 10 //this.latestPosition.coords.accuracy
          };

        fetch(`${this.apiServer}/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(params),
            })
            .then(response => {
                if (response.ok && response.status === 200) {
                    response.json()
                        .then(data => {
                            that.latestPositionState = data;
                            that.latestPositionState.lastUpdate = Date.now();
                        })
                        .catch((error) => {
                            console.error('Error during response unwraping:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    updateOrientation(orientation) {
        if (this.orientationPermissionUpdateHandler !== null) {
            this.orientationPermissionUpdateHandler(true);
            this.orientationPermissionUpdateHandler = null;
        }
        this.latestOrientation = orientation;
    }

    noGeoPositionAvailable(err) {
        if (err.code === 1) { // denied
            if (this.geoPositionWatch !== null) {
                navigator.geolocation.clearWatch(this.geoPositionWatch);
                this.geoPositionWatch = null;
            }
            console.log("reset geoPositionWatch when access denied");
            if (this.geoPermissionUpdateHandler !== null) {
                this.geoPermissionUpdateHandler(false);
            }
        } else if (err.code === 3) {
            ; // ignore acquisition time out
        } else {
            console.error(err);
        }
    }

    // can only be triggered by a real user interaction
    prepareUI(fun) {
        const main = document.documentElement;
        if (!main.requestFullscreen) {
            // iOS cannot go fullscreen
            fun(true);
            return;
        }
        const fullscreenRequest = main.requestFullscreen();
        fullscreenRequest
            .then(function () {
                // TODO add events and reacquire locks if necessary
                if ('wakeLock' in navigator) {
                    const wakeLock = navigator.wakeLock.request('screen')
                        .then(() => console.log("wake lock sucessfull acquired"))
                        .catch(() => console.log("failed to acquire wake lock"));
                }
                if ('orientation' in screen) {
                    const screenLock = screen.orientation.lock("portrait-primary")
                        .then(() => console.log("screen lock sucessfull acquired"))
                        .catch(() => console.log("failed to acquire screen lock"));
                }
                fun(true);
            })
            .catch(function (err) {
                console.log(err);
                fun(false);
            });
    }

    getDirection(angle) {
        if (angle === null) return 0;
        // return (360 + (this.navState.angle + this.orientationCurrent - this.orientationOffset))%360;
        return (360 + (angle + this.getOrientation()))%360;
    }

    getOrientation() {
        if (this.latestOrientation !== null) {
            if (this.latestOrientation.absolute === true) {
                return this.latestOrientation.alpha;
            } else {
                if ('webkitCompassHeading' in this.latestOrientation) {
                    //get absolute orientation for Safari/iOS
                    return 360 - this.latestOrientation.webkitCompassHeading;
                } else {
                    return this.latestOrientation.alpha - this.orientationOffset;
                }
            }
        }

        return 0;
    }

    getNavState() {
        // create a copy of the position state
        const navState = Object.assign({}, this.latestPositionState);
        navState.direction = this.getDirection(navState.angle);

        return navState;
    }

    resetPositionState() {
        this.latestPositionState = null;
    }

    rate(rating, refCode) {
        const params = {
          "uuid": this.sessionId,
          "location": {
            "lat": this.latestPosition.coords.latitude,
            "lon": this.latestPosition.coords.longitude
          },
          "status": this.status,
          "rating": rating,
          "refCode": refCode
        };

        return fetch(`${this.apiServer}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(params),
            });
    }

    async getPersonal() {
        const params = {
            "uuid": this.sessionId
        };

        const res = await fetch(`${this.apiServer}/personal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(params),
            });

        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res);
        }
    }

    getDownloadLink(navState) {
        if (!this.hasDownloadLink(navState)) {
            return "#";
        }
        if (!this.hasFoundTarget(navState)) {
            return "#";
        }
        return `${this.apiServer}/download/${navState.target.fileHash}`
    }

    hasDownloadLink(navState) {
        if (navState === undefined ||  navState === null) {
            return false;
        }
        if (navState.target.fileHash !== "") {
            return true;
        } else {
            return false;
        }
    }

    hasFoundTarget(navState) {
        if (navState.searchState === 'FOUND') {
            return true;
        } else {
            return false;
        }
    }

    deleteAccount() {
        const params = {
          "uuid": this.sessionId
        };

        // remove cookies
        document.cookie = 'sessionId=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'legal-verified=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        return fetch(`${this.apiServer}/delete-account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(params),
            });
      }
    
}