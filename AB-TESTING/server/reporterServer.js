const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const key = fs.readFileSync(__dirname + '/credentials/server.key' );
const cert = fs.readFileSync(__dirname + '/credentials/server.crt');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

const data = {};

app.get('/sendImpression', (req, res) => {
    const websiteURL = req.query.url;
    const variant = req.query.variant;
    db.addImpression(websiteURL, variant);
    res.end()
});

app.get('/sendEvent', (req, res) => {
    const websiteURL = req.query.url;
    const variant = req.query.variant;
    db.addClicks(websiteURL, variant);
    res.end()
});

app.get('/data', (req, res) => {
    const websiteURL = req.query.url;
    res.send(db.getData(websiteURL));
});

app.get('/alldata', (req, res) => {
    res.send(db.getAllData());
});

app.get('/results', (req, res) => {
    res.sendFile(__dirname + "/results.html")
});



https.createServer({key: key, cert: cert}, app).listen(3000, () => console.log("Server is running on port 3000"));

