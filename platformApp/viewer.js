const mainWidgetId = "14ffd3c2-de00-73d6-1831-64f837bb83f6";

const playButtonClickHandlers = {};
const pauseButtonClickHandlers = {};

const playEventSubscribers = {};
const pauseEventSubscribers = {};

function initAppForPage() {
    console.log("initAppForPage");
}


function pageReady($w) {

    console.log($w);
    // const playButton = $w("@Play");
    // playButton.onClick(() => player.show());
    // const pauseButton = $w("@Pause");
    // pauseButton.onClick(() => player.hide());
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
    createControllers,
    exports: {
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