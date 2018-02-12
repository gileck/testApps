function initAppForPage() {
    
}


function pageReady($w) {
    const player = $w("@Player");
    console.log(player);
    const playButton = $w("@Play");
    playButton.onClick(() => player.show());
    const pauseButton = $w("@Pause");
    pauseButton.onClick(() => player.hide());
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

    }
};