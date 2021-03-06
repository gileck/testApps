module.exports = function () {

    const cartItems = [];
    const onAddedToCartSubscribers = [];
    const products = [];

    function getProducts() {
        return products;
    }

    function getProduct(productId) {
        return products.find(product => product.id === productId)
    }

    function addToCart(productId) {
        cartItems.push(productId);
        invokeOnAddedToCartSubscribers(productId);
    }

    function subscribeToAddToCartEvent(callback) {
        onAddedToCartSubscribers.push(callback);
    }

    function invokeOnAddedToCartSubscribers(productId) {
        onAddedToCartSubscribers.forEach(fn => fn(productId));
    }

    function getCartItems() {
        return products.filter(product => cartItems.includes(product.productId));
    }


    function Product(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.productId = Math.round(Math.random() * 10000000);
    }

    const shirtImage = "http://img.michaels.com/L6/3/IOGLO/873402639/212485006/10186027_r.jpg?fit=inside|1024:1024";
    const jeansImage = "https://riverisland.scene7.com/is/image/RiverIsland/293654_main?wid=1200";
    const dressImage = "https://cdn.forevernew.com.au/media/catalog/product/cache/1/back_image/333x440/9df78eab33525d08d6e5fb8d27136e95/2/4/24894101.jpg";
    const coatImage = "http://shop.rubynz.com/user/images/8348.jpg?t=1706141548";
    const longShirtImage = "https://riverisland.scene7.com/is/image/RiverIsland/296260_main?wid=1200";
    const shoesImage = "https://rukminim1.flixcart.com/image/312/312/shoe/h/f/d/tan-drr-9184-sukun-7-original-imaees4junyhzbcu.jpeg?q=70";
    const hatImage = "http://scene7.zumiez.com/is/image/zumiez/pdp_hero/Nike-SB-Navy-Dad-Hat-_275238-front-US.jpg";

    function createProducts() {
        products.push(new Product("T Shirt", 25, shirtImage));
        products.push(new Product("Jeans", 70, jeansImage));
        products.push(new Product("Dress", 85, dressImage));
        products.push(new Product("Coat", 90, coatImage));
        products.push(new Product("Long Shirt", 100, longShirtImage));
        products.push(new Product("Shoes", 110, shoesImage));
        products.push(new Product("Hat", 30, hatImage));
    }

    createProducts();

    return {
        addToCart,
        getProduct,
        getProducts,
        subscribeToAddToCartEvent,
        getCartItems
    }
}();