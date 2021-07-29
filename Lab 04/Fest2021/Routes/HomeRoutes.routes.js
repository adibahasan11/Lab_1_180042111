const express = require('express');
const bodyParser = require("body-parser");

const { getDashboard } = require("./../Controllers/HomeController.controllers");
const { isLoggedIn } = require("./../Middlewares/Auth.middlewares");

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.get("/dashboard", isLoggedIn, getDashboard);

module.exports = Router;