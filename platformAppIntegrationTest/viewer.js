const mainWidgetId = "14ffd3c2-de00-73d6-1831-64f837bb83f6";
// const _ = require("lodash");

let openPopUp;
const subscribers = [];

function initAppForPage() {
    console.log("initAppForPage");
}


function createControllers(controllerConfigs) {
    console.log("controllerConfigs", controllerConfigs);
    return controllerConfigs.map(controllerConfig => {
        const compId = controllerConfig.config.compId;
        console.log("compId", compId);
        return {
            exports: {
                openPopUp: function (url) {
                    if (_.isFunction(openPopUp)) {
                        openPopUp(url);
                    } else {
                        console.log("Error");
                    }
                },
                onEvent: function (callback) {
                    subscribers.push(callback);
                }
            },
            pageReady: _.noop
        }
    });
}


module.exports = {
    initAppForPage,
    createControllers,
    exports: {
        registerOpenPopUpFunction: function (func) {
            openPopUp = func
        },
        fireEvent() {
            subscribers.forEach(fn => fn());
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