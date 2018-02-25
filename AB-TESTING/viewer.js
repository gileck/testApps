const SectionPageWidgetId = "151513bc-27d7-a20f-acba-5a9f33fd0089";
const addToCartWidgetId = "15155906-4f97-a407-76b1-4ea14d296d47";
const mainWidgetId = "14ffd3c2-de00-73d6-1831-64f837bb83f6";
const onAddedToCartSubsribers = [];
const productsInCart = [];

function initAppForPage() {
    console.log("initAppForPage");
}

function pageReady($w) {
}

function createControllers(controllerConfigs) {
    return controllerConfigs.map(controllerConfig => {
        return {
            pageReady: pageReady
        }
    });
}


module.exports = {
    initAppForPage,
    createControllers,
}