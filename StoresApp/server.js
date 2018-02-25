const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const key = fs.readFileSync('./server.key');
const cert = fs.readFileSync('./server.crt' );
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

const productsInCart = [];
const products = [];
const productsMap = {};

function Product(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.productId = Math.round(Math.random() * 10000000);
    productsMap[this.productId] = this;
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


app.get('/addToCart/:id', (req, res) => {
    const productId = req.params.id;
    console.log(productId);
    productsInCart.push(productId);
    console.log(productsInCart);
    res.send(productsInCart);
    // res.send(productsInCart);
});

app.get('/removeFromCart/:id', (req, res) => {
    const productId = req.params.id;
    const index = productsInCart.findIndex(pid => pid === productId);
    productsInCart.splice(1, index);
    res.send(productsInCart);
    // res.send(productsInCart);
});


app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/cart', (req, res) => {
    console.log(productsInCart);
   res.send(productsInCart.map(id => productsMap[id]));
});

https.createServer({key: key, cert: cert}, app).listen(3000, () => console.log("Server is running on port 3000"));

