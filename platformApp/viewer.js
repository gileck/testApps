const mainWidgetId = "14ffd3c2-de00-73d6-1831-64f837bb83f6";
console.log("HERE");
const playButtonClickHandlers = {};
const pauseButtonClickHandlers = {};

const playEventSubscribers = {};
const pauseEventSubscribers = {};

let Wix;

let getProduct;

function initAppForPage(appParams, appUtils, Wix) {
    console.log(Wix.window.viewMode);
}


function pageReady($w, wix) {
    Wix = wix;

    // console.log($w);
    // const playButton = $w("@Play");
    // playButton.onClick(() => player.show());
    // const pauseButton = $w("@Pause");
    // pauseButton.onClick(() => player.hide());
}


let _resolve, _getProduct;
function createController3(controllerConfigs) {
    let Wix;
    // const viewMode = Wix.window.viewMode;
    // console.log(viewMode);
    return [{
        pageReady: pageReady,
        exports: {
            getProduct: function () {
                return new Promise(function(resolve, reject) {
                    if (_.isFunction(_getProduct)) {
                        resolve(_getProduct)
                    } else {
                        _resolve = resolve;
                    }
                });
            }
        }
    }];
}


function createController2(controllerConfigs) {
    return controllerConfigs.map(controllerConfig => {
           if (controllerConfig.type === "c1") {
                return Promise.resolve({
                    exports: {
                        get: async function () {
                            console.log("here");

                            await fetch('/')
                        }
                    },
                    pageReady: _.noop
                });
           }
           if (controllerConfig.type === "fooBar2") {
               return Promise.reject();
           }
           return Promise.resolve({
               exports: {

               },
               pageReady: _.noop
           })
    });
}


function createControllers(controllerConfigs) {
    console.log("controllerConfigs", controllerConfigs);
    return controllerConfigs.map(controllerConfig => {
        const compId = controllerConfig.config.compId;
        console.log("compId", compId);
        return {
            exports: {
                play: function () {
                    playButtonClickHandlers[compId]();
                    console.log("play: " + compId);
                },
                pause: function () {
                    pauseButtonClickHandlers[compId]();
                    console.log("pause: " + compId);
                },
                onPlay: function (callback) {
                    console.log("onPlay", callback);
                    if (!playEventSubscribers[compId]) {
                        playEventSubscribers[compId] = [];
                    }
                    playEventSubscribers[compId].push(callback)
                },
                onPause: function (callback) {
                    console.log("onPause", callback);

                    if (!pauseEventSubscribers[compId]) {
                        pauseEventSubscribers[compId] = [];
                    }
                    pauseEventSubscribers[compId].push(callback)
                }
            },
            pageReady: _.noop
        }
    });
}


module.exports = {
    initAppForPage,
    createControllers: createController3,
    exports: {
        setGetProductFunction: function (fn) {
            if (_.isFunction(_resolve)) {
                _resolve(fn());
            } else {
                _getProduct = fn;
            }
        },
        onPlayButtonClick: function (compId, callback) {
            console.log("setting playButtonClickHandler", compId);
            playButtonClickHandlers[compId] = callback;
        },
        onPauseButtonClick(compId, callback) {
            console.log("setting pauseButtonClickHandler", compId);
            pauseButtonClickHandlers[compId] = callback;
        },
        fireEvent: function (compId, event) {
            console.log(event + " was fired");
            const events = {
                "play": () => playEventSubscribers[compId].forEach(f => f()),
                "pause": () => pauseEventSubscribers[compId].forEach(f => f()),
            };
            events[event]();
        }
    }
};