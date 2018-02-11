const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const key = fs.readFileSync('./server.key');
const cert = fs.readFileSync('./server.crt' );

const options = {
    key: key,
    cert: cert
};

app.use(express.static(__dirname));

app.get('/Page', (req, res) => {
    res.sendFile(__dirname + "/TPA/Page.html");
});

app.get('/Page/:color', (req, res) => {
    res.sendFile(__dirname + "/TPA/Page.html");
});

app.get('/provider*', (req, res) => {
    res.sendFile(__dirname + "/TPA/Page.html");
});

app.get('/Widget', (req, res) => {
    res.sendFile(__dirname + "/TPA/index.html");
});

app.get('/menu', (req, res) => {
    res.sendFile(__dirname + "/TPA/Menu.html");
});

app.get('/client*', (req, res) => {
    res.sendFile(__dirname + "/TPA/client.html");
});

app.get('/gluedWidget*', (req, res) => {
    res.sendFile(__dirname + "/TPA/Fixed.html");
});

https.createServer(options, app).listen(5000, () => console.log("Server is running on port 5000"));

