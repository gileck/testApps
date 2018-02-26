const serverURL = "https://192.168.230.26:3000";
const VARIANT_A = 0;
const VARIANT_B = 1;

function initAppForPage() {
    console.log("initAppForPage");
}

function pageReady($w, wix, {config}) {
    const websiteURL = wix.location.baseUrl;
    const {percentage} = config;
    //replace this with value from the connection config
    const variant = getVariant(percentage);
    console.log(variant);
    sendImpression(variant, websiteURL);
    $w("@mainContainer").changeSlide(variant);
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
function getVariant(percentage) {
  return Number(Math.random() * 100 >= percentage);
}

module.exports = {
    initAppForPage,
    createControllers,
};