const mainWidgetId = "151ae420-5772-cb46-d55a-f804d84119db";
const WidgetId2 = "14ffd3c2-de00-73d6-1831-64f837bb83f7";


// const _ = require("lodash");

let openPopUpFunction;
const subscribers = [];

let tpaIsReadyFunction, tpaIsReady = false;

function initAppForPage() {
    console.log("initAppForPage");
}

function waitForIframeToLoad() {
    return new Promise(function (resolve) {
        tpaIsReadyFunction = resolve;
    });
}

const exportFunctions = {
    [mainWidgetId]: {
        openPopUp: async function (url) {
            await waitForIframeToLoad();
            if (_.isFunction(openPopUpFunction)) {
                return openPopUpFunction(url);
            } else {
                console.log("Error");
            }
        },
        onButtonClicked: function (callback) {
            subscribers.push(callback);
        },
        onEvent: function (callback) {
            subscribers.push(callback);
        },
    },
    [WidgetId2]: {
        openURL: function () {
            //
        }
    }
};


function createControllers(controllerConfigs) {
    const array = controllerConfigs.map(controllerConfig => {
        const compId = controllerConfig.config.compId;
        return {
            exports: exportFunctions[controllerConfig.type],
            pageReady: function () {}
        }
    });
    return array;
}


module.exports = {
    initAppForPage: initAppForPage,
    createControllers: createControllers,
    exports: {
        registerOpenPopUpFunction: function (func) {
            openPopUpFunction = func
        },
        fireEvent() {
            subscribers.forEach(fn => fn());
        },
        tpaIsReady() {
            if (_.isFunction(tpaIsReadyFunction)) {
                tpaIsReadyFunction();
            } else {
                tpaIsReady = true;
            }
        }
        // fireEvent: function (compId, event) {
        //     console.log(event + " was fired");
        //     const events = {
        //         "play": () => playEventSubscribers[compId].forEach(f => f()),
        //         "pause": () => pauseEventSubscribers[compId].forEach(f => f()),
        //     };
        //     events[event]();
        // }
    }
};