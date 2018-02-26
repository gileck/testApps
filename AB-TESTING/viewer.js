const SectionPageWidgetId = "151513bc-27d7-a20f-acba-5a9f33fd0089";
const addToCartWidgetId = "15155906-4f97-a407-76b1-4ea14d296d47";
const mainWidgetId = "14ffd3c2-de00-73d6-1831-64f837bb83f6";
const onAddedToCartSubsribers = [];
const productsInCart = [];
const serverURL = "https://192.168.230.26:3000";
const VARIANT_A = 0;
const VARIANT_B = 1;

function initAppForPage() {
    console.log("initAppForPage");
}

function pageReady($w, Wix, controllerConfig) {
    const websiteURL = Wix.location.baseUrl;
    const variantPCT = 50;
    //replace this with value from the connection config
    const chosenVariant = getVariant(variantPCT);
    console.log(chosenVariant);
    sendImpression(chosenVariant, websiteURL);
    $w("@mainContainer").changeSlide(chosenVariant);
    $w("@SiteButton0").onClick(() => sendEvent(VARIANT_A, websiteURL));
    $w("@SiteButton1").onClick(() => sendEvent(VARIANT_B, websiteURL));
}

function createControllers(controllerConfigs) {
    console.log(controllerConfigs);
    return controllerConfigs.map(controllerConfig => {
        return {
            pageReady: ($w, Wix) => pageReady($w, Wix, controllerConfig)
        }
    });
}

async function sendImpression(variant, url) {
    await fetch(serverURL + "/sendImpression?url=" + url + "&variant=" + variant);
}

async function sendEvent(variant, url) {
    await fetch(serverURL + "/sendEvent?url=" + url + "&variant=" + variant);
}

/**
 * simple algorithm for choosing a random weighed number
 */
function getVariant(varientAPercant) {
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