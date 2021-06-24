const express = require('express');
const bodyParser = require("body-parser");

const { getRegister, getLogin, getDashboard, postRegister, postLogin } = require("./../Controllers/UserController.controllers")

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.get("/dashboard", getDashboard);

Router.route("/login").get(getLogin).post(postLogin);

Router.route("/register").get(getRegister).post(postRegister);

module.exports = Router;