export {
    getSessionId,
    isLegalVerified,
    setLegalVerified,
    setDocHeight,
    registerDocHeightListeners,
    isImage,
    isAudio,
    isVideo,
    isModel,
    isLink,
    isYoutubeLink,
    humanDistance,
    getApiServer,
    filterEmojiInput,
    reload,
    get
};

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
function setDocHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
};

function registerDocHeightListeners() {
    window.addEventListener('resize', setDocHeight);
    window.addEventListener('orientationchange', setDocHeight);
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();

    //Time in microseconds since page-load or 0 if unsupported
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        //random number between 0 and 16
        var r = Math.random() * 16;
        //Use timestamp until depleted
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
            //Use microseconds since page-load if supported
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }

        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function getSessionId() {
    let sessionId = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (sessionId === "") {
        sessionId = generateUUID();
        document.cookie = `sessionId=${sessionId};max-age=7776000`;
    }
    return sessionId;
}

function isLegalVerified() {
    const legalVerified = document.cookie.replace(/(?:(?:^|.*;\s*)legal-verified\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (legalVerified === "true") {
        return true;
    }
    return false;
}

function setLegalVerified(state) {
    if (state === true) {
        document.cookie = `legal-verified=true;max-age=7776000`;
    } else {
        document.cookie = `legal-verified=false;max-age=7776000`;
    }
}


function isImage(mimeType) {
    if (/image\//.test(mimeType)) return true;
    return false;
}

function isAudio(mimeType) {
    if (/audio\//.test(mimeType)) return true;
    return false;
}

function isVideo(mimeType) {
    if (/application\/x-matroska/.test(mimeType)) return true;
    if (/video\//.test(mimeType)) return true;
    return false;
}

function isModel(mimeType) {
    if (/model\/gltf-binary/.test(mimeType)) return true;
    return false;
}

function isLink(mimeType) {
    if (/text\/link/.test(mimeType)) return true;
    return false;
}

function isYoutubeLink(link) {
    if (/https:\/\/www.youtube.com\/embed\//.test(link)) return true;
    return false;
}

function humanDistance(distance_in_meters) {
    if (distance_in_meters < 100) {
        return `${Math.round(distance_in_meters)}m`;
    }

    if (distance_in_meters < 1000) {
        const rounded = Math.round(distance_in_meters/10)*10;
        return `${Math.round(rounded)}m`;
    }

    if (distance_in_meters < 10000) {
        const rounded = Math.round(distance_in_meters/100)/10;
        return `${Math.round(rounded)}km`;
    } else {
        const rounded = Math.round(distance_in_meters/1000);
        return `${Math.round(rounded)}km`;
    }
}

function getApiServer() {
    if (window.location.hostname === "localhost") {
        return "https://research.xn--rro-pla.de";
    } else {
        return "https://research.xn--rro-pla.de";
//        return `https://api.${window.location.hostname}`;
    }
}

function filterEmojiInput(input) {
    // https://unicode.org/reports/tr51/#Emoji_Properties
    const regexpEmojiPresentation = /\p{Emoji}/gu;
    let filteredInput = "";
    const matches = input.match(regexpEmojiPresentation);
    if (matches) {
        filteredInput = matches.join('');
    }
    return filteredInput;
}

function reload() {
    // reload page
    window.location.reload();
}

async function get(link) {
    const res = await fetch(link);

    if (res.ok) {
        return res.text();
    } else {
        throw new Error(res);
    }
}
