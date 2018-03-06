function initAppForPage() {
    console.log("initAppForPage for ECOM viewerScript");
}

function createControllers(controllerConfigs) {
    console.log(controllerConfigs);
    return controllerConfigs.map(controllerConfig => {
        return {
            pageReady: function () {
                console.log("here");
            }
        }
    });
}


module.exports = {
    initAppForPage,
    createControllers
};


