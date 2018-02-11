function initAppForPage() {
    
}

let onPlayButtonClickedCallback;
let onPauseButtonClickedCallback;

function pageReady($w) {
    const playButton = $w("@Play");
    playButton.onClick(() => onPlayButtonClickedCallback());
    const pauseButton = $w("@Pause");
    pauseButton.onClick(() => onPauseButtonClickedCallback());
    console.log(playButton);
    console.log(pauseButton);
}

function createControllers(controllerConfigs) {
    return controllerConfigs.map(controller => ({
        pageReady
    }));
}


module.exports = {
    initAppForPage,
    createControllers,
    exports: {
        onPlayButtonClick: function (callback) {
            onPlayButtonClickedCallback = callback;
        },
        onPauseButtonClick: function (callback) {
            onPauseButtonClickedCallback = callback
        }
    }
};


/**


let widgetCallback;
function initAppForPage() {
    return Promise.resolve();
}

function demoHybridController() {
    return {
        pageReady: function ($w) {
            $w('@next_btn').onClick(() => widgetCallback('next'))
            $w('@prev_btn').onClick(() => widgetCallback('previous'))
        }
    };
}

var controllerByType = {
    'demoHybridController': demoHybridController
};

function createControllers(controllerConfigs) {
    return controllerConfigs.map(function (_ref) {
        var type = _ref.type;
        return controllerByType[type] ? Promise.resolve(controllerByType[type]()) : Promise.reject(new Error('Unknown controller type [' + type + ']'));
    });
}


module.exports = {
    initAppForPage: initAppForPage,
    createControllers: createControllers,
    exports: {
        onClick: function (cb) {
            widgetCallback = cb;
        }
    }
};
*/