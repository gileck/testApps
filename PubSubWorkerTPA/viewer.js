module.exports = function () {

    const mainWidgetId = "14ffd3c2-de00-73d6-1831-64f837bb83f6";
    const playButtonClickHandlers = {};
    const pauseButtonClickHandlers = {};

    const playEventSubscribers = {};
    const pauseEventSubscribers = {};

    let Wix;

    let getProduct;
    let publish, subscribe, unsubscribe;
    let applicationId;

    function initAppForPage(appParams, appUtils, Wix) {
        console.log(appUtils);
        applicationId = appParams.appInstanceId;
        publish = appUtils.pubSub.publish;
        subscribe = appUtils.pubSub.subscribe;
        unsubscribe = appUtils.pubSub.unsubscribe;
    }

    function pageReady($w) {
        $w("@publish").onClick(() => publish('SOME_EVENT', {app: applicationId}));
        $w("@publish2").onClick(() => publish('SOME_EVENT', {app: applicationId}, true));
        $w("@subscribe").onClick(() => subscribe("SOME_EVENT", (data) => console.log("PUBLISHED!",  data)));
        $w("@Unsubscribe").onClick(() => unsubscribe("SOME_EVENT"));
        $w("@subscribe2").onClick(() => subscribe("SOME_EVENT", (data) => console.log("PUBLISHED!", data), true));

    }

    function defaultCreateControllers(controllerConfigs) {
        return controllerConfigs.map(function (config) {
            if (config.type === "c1") {
                return {
                    pageReady,
                    exports: {}
                };
            } else if (config.type === "c2") {
                return {
                    pageReady,
                    exports: {}
                };
            } else {
                return {
                    pageReady: _.noop,
                    exports: {}
                }
            }
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

    function CC(controllerConfigs) {
        console.log(controllerConfigs);
        return controllerConfigs.map(c => ({pageReady: _.noop, exports: {}}))
    }


    return {
        initAppForPage,
        createControllers: defaultCreateControllers,
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
    }

}();









