const express = require('express');
const app = express();
app.use(express.static(__dirname));


app.get('/Page', (req, res) => {
    res.sendFile(__dirname + "/Page.html");
});

app.get('/Page/:color', (req, res) => {
    res.sendFile(__dirname + "/Page.html");
});

app.get('/provider*', (req, res) => {
    res.sendFile(__dirname + "/Page.html");
});

app.get('/Widget', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/menu', (req, res) => {
    res.sendFile(__dirname + "/Menu.html");
});

app.get('/client*', (req, res) => {
    res.sendFile(__dirname + "/client.html");
});


app.get('/gluedWidget*', (req, res) => {
    res.sendFile(__dirname + "/Fixed.html");
});





app.listen(5000, () => console.log('Example app listening on port 3000!'))