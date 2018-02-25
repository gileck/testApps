const SectionPageWidgetId = "151513bc-27d7-a20f-acba-5a9f33fd0089";
const addToCartWidgetId = "15155906-4f97-a407-76b1-4ea14d296d47";
const mainWidgetId = "14ffd3c2-de00-73d6-1831-64f837bb83f6";
const onAddedToCartSubsribers = [];
const productsInCart = [];

function initAppForPage() {
    console.log("initAppForPage");
}

function pageReady($w) {
    const varientPCT = 50;
    //replace this with value from the connection config
    const index = getVarient(varientPCT);
    console.log(index);
    sendImpression();
    $w("@mainContainer").changeSlide(index);
    $w("@ButtonA").onClick(() => sendEvent(0));
    $w("@ButtonB").onClick(() => sendEvent(1));
}

function createControllers(controllerConfigs) {
    console.log(controllerConfigs);
    return controllerConfigs.map(controllerConfig => {
        return {
            pageReady: pageReady
        }
    });
}

function sendImpression(index) {

}

function sendEvent(index) {
    console.log(index);
}

/**
 * simple algorithm for choosing a random weighed number
 */
function getVarient(varientAPercant) {
    const array = [];
    for (let i = 0; i < varientAPercant; i++) array.push(0)
    for (let i = varientAPercant; i < 100; i++) array.push(1)
    const rundomIndexOfArray = Math.floor(Math.random() * 100);
    return array[rundomIndexOfArray];
}

module.exports = {
    initAppForPage,
    createControllers,
};