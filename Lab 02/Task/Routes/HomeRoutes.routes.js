const express = require('express');
const bodyParser = require("body-parser");

const { errorPage, getHome } = require("./../Controllers/HomeController.controllers");

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.get("/", getHome);

Router.use(errorPage);

module.exports = Router;