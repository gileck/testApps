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
    let locale = wix.window.locale;  // "en"
    let pubsub;

    function initAppForPage(appParams, appUtils, Wix, SDK) {
        pubsub = appUtils.pubSub;

        // console.log("SDK", SDK);

        // console.log("Wix", Wix);

        // console.log(appUtils);
        // applicationId = appParams.appInstanceId;
        // publish = appUtils.pubSub.publish;
        // subscribe = appUtils.pubSub.subscribe;
        // unsubscribe = appUtils.pubSub.unsubscribe;
    }

    function pageReady($w) {
        // $w("@publish").onClick(() => publish('SOME_EVENT', {app: applicationId}));
        // $w("@publish2").onClick(() => publish('SOME_EVENT', {app: applicationId}, true));
        // $w("@subscribe").onClick(() => subscribe("SOME_EVENT", (data) => console.log("PUBLISHED!",  data)));
        // $w("@Unsubscribe").onClick(() => unsubscribe("SOME_EVENT"));
        // $w("@subscribe2").onClick(() => subscribe("SOME_EVENT", (data) => console.log("PUBLISHED!", data), true));

    }

    function pageReady2($w) {
        console.log("HA");
        $w("@Button").label = "buttonFromApp";
        // return Promise.reject();
    }

    const emptyController = {
        pageReady: _.noop,
        exports: {}
    };

    const controllersByType =  {
        'c1': {
            pageReady: $w => {
                $w("@button1").label = "c1";
            },
            exports: {}
        },
        'c2': {
            pageReady: $w => {
                $w("@button2").label = "c2";
            },
            exports: {}
        },
        '14ffd3c2-de00-73d6-1831-64f837bb83f6': {
            pageReady: () => {},
            exports: {
                setItems: function (items) {
                    console.log({items});
                    console.log({compId});
                    pubsub.publish('setItem_' + compId, {items}, true);
                }
            }
        }

    };

    function defaultCreateControllers(controllerConfigs) {
        console.log("controllerConfigs", controllerConfigs);
        return controllerConfigs.map(function (config) {
            if (controllersByType[config.type]) {
                return Promise.resolve(controllersByType[config.type])
            } else return Promise.resolve(emptyController);
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









