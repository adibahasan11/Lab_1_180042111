const express = require('express');
const bodyParser = require("body-parser");

const { getRegister, getLogin, getDashboard } = require("./../Controllers/UserController.controllers")

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.get("/dashboard", getDashboard);

Router.get("/login", getLogin);

Router.get("/register", getRegister);

module.exports = Router;