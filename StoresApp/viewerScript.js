// const SectionPageWidgetId = "151513bc-27d7-a20f-acba-5a9f33fd0089";
const addToCartWidgetId = "1515abc3-aa95-1e7d-f959-3c8eb157c8c3";
const storesCartWidgetId = "1380bbc4-1485-9d44-4616-92e36b1ead6b";
const serverURL = "https://localhost:3000";
const storesLogic = getStoresLogic();
const storesAPI = {
    getProducts: storesLogic.getProducts,
    getProduct: storesLogic.getProduct,
    addToCart: storesLogic.addToCart,
    onItemAddedToCart: storesLogic.subscribeToAddToCartEvent,
    getCartItems: storesLogic.getCartItems,
    removeFromCart: storesLogic.removeFromCart,
    getItemsInCartCount: storesLogic.getItemsInCartCount
};
const publicFunctions = {
    [addToCartWidgetId]: storesAPI,
    [storesCartWidgetId]: storesAPI
};

function initAppForPage() {
    return fetch('https://localhost:3000/products').then(response => response.json()).then(data => storesLogic.setProducts(data));
}

function createControllers(controllerConfigs) {
    //debugger
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
    exports: storesAPI
};


function getStoresLogic() {
    console.log("init getStoresLogic");
    let onAddedToCartSubscribers = [];
    let products = [];

    function getProducts() {
        return fetch('https://localhost:3000/products')
            .then(response => response.json());
    }

    function getProduct(productId) {
        return products.find(product => product.id === productId)
    }

    function addToCart(productId) {
        console.log("addToCart", productId);
        return fetch(serverURL + '/addToCart/' + productId).then(() => invokeOnAddedToCartSubscribers(productId, 1));

    }

    function removeFromCart(productId) {
        console.log("removeFromCart", productId);
        invokeOnAddedToCartSubscribers(productId, -1);
        return fetch(serverURL + '/removeFromCart/' + productId).then(() => invokeOnAddedToCartSubscribers(productId, -1));
        // console.log("addToCart", productId);
        // const productIndex = products.findIndex(product => product.productId === productId);
        // products.splice(productIndex, 1);
    }

    function subscribeToAddToCartEvent(callback) {
        console.log("subscribeToAddToCartEvent");
        onAddedToCartSubscribers.push(callback);
    }

    function invokeOnAddedToCartSubscribers(productId, value) {
        console.log("invokeOnAddedToCartSubscribers", productId);
        onAddedToCartSubscribers.forEach(fn => fn(productId, value));
    }

    function getCartItems() {
        return fetch(serverURL + '/cart').then(response => response.json());
    }

    function setProducts(_products) {
        products = _products;
    }
    
    function getItemsInCartCount() {
        return fetch(serverURL + '/cart').then(response => response.json()).then(data => data.length);
    }

    return {
        addToCart,
        getProduct,
        getProducts,
        subscribeToAddToCartEvent,
        getCartItems,
        removeFromCart,
        setProducts,
        getItemsInCartCount
    }
}