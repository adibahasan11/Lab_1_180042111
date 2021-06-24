const express = require('express');
const bodyParser = require("body-parser");

const { getRegister, getLogin, getDashboard, postRegister, postLogin, logout } = require("./../Controllers/UserController.controllers");
const isLoggedIn = require("./../Middlewares/Auth.middlewares");

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.get("/dashboard", isLoggedIn, getDashboard);

Router.route("/login").get(getLogin).post(postLogin);

Router.route("/register").get(getRegister).post(postRegister);

Router.get('/logout', logout)

module.exports = Router;