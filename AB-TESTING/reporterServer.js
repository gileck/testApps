const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const key = fs.readFileSync(__dirname + '/credentials/server.key' );
const cert = fs.readFileSync(__dirname + '/credentials/server.crt');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

app.get('/sendImpression', (req, res) => {
    const websiteURL = req.query.url;
    const variant = req.query.variant;
    console.log(websiteURL);
    console.log(variant);
});

app.get('/sendEvent', (req, res) => {
    const websiteURL = req.query.url;
    const variant = req.query.variant;
    console.log(websiteURL);
    console.log(variant);
});

https.createServer({key: key, cert: cert}, app).listen(3000, () => console.log("Server is running on port 3000"));

