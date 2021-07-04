export { Airrow };

class Airrow {

    constructor(apiServer) {
        this.latestPosition = null;
        this.latestOrientation = null;
        this.latestPositionState = null;
        this.sessionId = null;
        this.status = "";
        this.apiServer = apiServer;

        this.geoPositionWatch = null;
        

        this.geoLocationOptions = {
            enableHighAccuracy: true,
            timeout: 2000
        };

        // there can only be one
        this.geoPermissionUpdateHandler = null;
        this.updateNavigationHandler = null;
    }

    registerGeoPermissionUpdate(fun) {
        this.geoPermissionUpdateHandler = fun;
    }

    registerUpdateNavigation(fun) {
        this.updateNavigationHandler = fun;
    }

    checkGeoPermissions(fun) {
        if (navigator.permissions === undefined) {
			fun(false);
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

    start() {
        if ( this.geoPositionWatch !== null ) return;

        this.geoPositionWatch = navigator.geolocation.watchPosition(
            this.updateCoordinates.bind(this),
            this.noGeoPositionAvailable.bind(this),
            this.geoLocationOptions);
        
        if ('ondeviceorientationabsolute' in window) {
            // works only in Chrome
            window.addEventListener('deviceorientationabsolute', this.updateOrientation.bind(this));
        } else if ('ondeviceorientation' in window) {
            window.addEventListener('deviceorientation', this.updateOrientation.bind(this));
        }
    }

    updateCoordinates(position) {
        const that = this;
        if (this.geoPermissionUpdateHandler !== null) {
            this.geoPermissionUpdateHandler(true);
            this.geoPermissionUpdateHandler = null;
        }
        this.latestPosition = position;

        const params = {
            "uuid": this.sessionId,
            "location": {
              "lat": this.latestPosition.coords.latitude,
              "lon": this.latestPosition.coords.longitude
            },
            "status": "",
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
                            if (this.updateNavigationHandler !== null) {
                                this.updateNavigationHandler();
                            }
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
        const fullscreenRequest = main.requestFullscreen();
        fullscreenRequest
            .then(function () {
                console.log("fullscreen active");
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
        // return (360 + (this.navState.angle + this.orientationCurrent - this.orientationOffset))%360;
        return (360 + (angle + this.getOrientation()))%360;
    }

    getOrientation() {
        if (this.latestOrientation !== null) {
            return this.latestOrientation.alpha;
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

        this.resetPositionState();

        return fetch(`${this.apiServer}/rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(params),
            });
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
    
}