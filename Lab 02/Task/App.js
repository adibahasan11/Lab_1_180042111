const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("<h1> Welcome - GET </h1>");
});

module.exports = app;