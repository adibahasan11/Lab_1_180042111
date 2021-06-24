const express = require('express');
const app = express();

const UserRoutes = require('./Routes/UserRoutes.routes');
const { errorPage, getHome } = require("./Controllers/HomeController.controllers");

app.use(express.static('Public'));

app.use(UserRoutes);

app.get("/", getHome);

app.use(errorPage);

module.exports = app;