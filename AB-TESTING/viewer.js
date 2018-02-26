const serverURL = "https://192.168.230.26:3000";
const VARIANT_A = 0;
const VARIANT_B = 1;

function initAppForPage() {
    console.log("initAppForPage");
}

function pageReady($w, wix, variant) {
    const websiteURL = wix.location.baseUrl;
    console.log(variant);
    sendImpression(variant, websiteURL);
    $w("@mainContainer").changeSlide(variant);
    $w("@SiteButton0").onClick(() => sendClickEvent(VARIANT_A, websiteURL));
    $w("@SiteButton1").onClick(() => sendClickEvent(VARIANT_B, websiteURL));
}

function createControllers(controllerConfigs) {
    console.log(controllerConfigs);
    return controllerConfigs.map(controllerConfig => {
      const {percentage} = controllerConfig.config;
      const variant = getVariant(percentage);
        return {
            pageReady: ($w, Wix) => pageReady($w, Wix, variant),
            exports: {
                getVariant() {
                    return variant;
                }
            }
        }
    });
}

async function sendImpression(variant, url) {
    await fetch(serverURL + "/sendImpression?url=" + url + "&variant=" + variant);
}

async function sendClickEvent(variant, url) {
    await fetch(serverURL + "/sendClickEvent?url=" + url + "&variant=" + variant);
}

async function sendHoverEvent(variant, url) {
    await fetch(serverURL + "/sendHoverEvent?url=" + url + "&variant=" + variant);
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