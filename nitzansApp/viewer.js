const SectionPageWidgetId = "151513bc-27d7-a20f-acba-5a9f33fd0089";
const addToCartWidgetId = "15155906-4f97-a407-76b1-4ea14d296d47";
const mainWidgetId = "14ffd3c2-de00-73d6-1831-64f837bb83f6";
const onAddedToCartSubsribers = [];
const productsInCart = [];

function initAppForPage() {
    console.log("initAppForPage");
}


function pageReady($w) {

    console.log($w);
    const player = $w("@Player");
    const playButton = $w("@Play");
    playButton.onClick(() => player.show());
    const pauseButton = $w("@Pause");
    pauseButton.onClick(() => player.hide());
}


const publicFunctions = {
    [addToCartWidgetId]: storesAPI,
    [SectionPageWidgetId]: {
        getProduct: function () {
            return {
                name: "Shirt",
                price: "150$",
                image: "http://img.michaels.com/L6/3/IOGLO/873402639/212485006/10186027_r.jpg?fit=inside|1024:1024",
                id: "3124124"
            };
        },
    },
    fooBar: {
        fooBarFunc: function () {
            console.log("fooBarFunc");
        }
    }

};

function createControllers(controllerConfigs) {
    const controllersConfigurations = controllerConfigs.map(controllerConfig => {
        return {
            exports: publicFunctions[controllerConfig.type],
            pageReady: _.noop
        }
    });

    console.log("controllerConfigs", controllerConfigs);
    console.log(controllersConfigurations);

    return controllersConfigurations;
}


module.exports = {
    initAppForPage,
    createControllers,
    exports: {
        subscribeToAddToCartEvent: function (callback) {
            console.log("subscribing function to addToCart");
            onAddedToCartSubsribers.push(callback);
        },
        invokeOnAddedToCartSubscribers(productId) {
            invokeOnAddedToCartSubscribers(productId);
        },
        addToCart: function (id) {
            productsInCart.push(id);
            invokeOnAddedToCartSubscribers(id);
        }
    }
};