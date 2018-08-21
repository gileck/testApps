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
    let experiments = {};

    const createApiClass = function (Element) {
        return class API extends Element {
            constructor($w, args) {
                super(...args);
                this.$w = $w;
            }

            set label(label) {
                const button = this.$w("@button1");
                button.label = label;
            }

            get Items() {
                console.log({experiments});
                if (experiments['Experiment1']) {
                    return "123456";
                } else {
                    return "567890";
                }
            }
        }
    };

    async function initAppForPage(appParams, appUtils, Wix, SDK) {
        pubsub = appUtils.pubSub;
        console.log("start initAppForPage");

        experiments = await getExperiments();
        console.log("initAppForPage");
        return;
    }

    function getExperiments() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    'newAPI': true,
                    'Experiment1': false,
                    'Experiment2': false,
                    'Experiment3': false
                })
            }, 100);
        })
    }

    class MyGreatAPI {
    }

    class MyNewAPIUnderDev {
        constructor($w, compInfo) {
            this.$w = $w;
        }

        set label(label) {
            const button = this.$w("@button1");
            button.label = label
        }

        get Items() {
            console.log({experiments});
            if (experiments['Experiment1']) {
                return "123456";
            } else {
                return "567890";
            }
        }

        set color(color) {
            const button = this.$w("@button1");
            button.style.backgroundColor = color
        }
    }

    function controller() {
        console.log("controller()");
        console.log("experiments['newAPI']", experiments['newAPI']);
        return {
            pageReady: () => {
                return Promise.resolve()
            },
            // apiClass: MyGreatAPI
            apiClass: createApiClass
        }
    }

    const emptyController = Promise.resolve({
        pageReady: _.noop,
        exports: {}
    });

    const controllersByType = {
        'c1': Promise.resolve(controller()),
        'c2': Promise.resolve({
            pageReady: function ($w) {
                $w("@button2").label = new Date().toLocaleString();
            }
        }),
        'c3': Promise.resolve({
            pageReady: $w => {
                $w("@button3").label = 'data from c3'
            }
        }),
        '14ffd3c2-de00-73d6-1831-64f837bb83f6': Promise.resolve({
            pageReady: () => {
            },
            exports: {
                setItems: function (items) {
                    console.log({items});
                    console.log({compId});
                    pubsub.publish('setItem_' + compId, {items}, true);
                }
            }
        })

    };

    function defaultCreateControllers(controllerConfigs) {
        console.log("controllerConfigs", controllerConfigs);
        return controllerConfigs.map(function (config) {
            if (controllersByType[config.type]) {
                return controllersByType[config.type]
            } else {
                return emptyController
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









