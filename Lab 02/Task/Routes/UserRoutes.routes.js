const express = require('express');
const bodyParser = require("body-parser");

const { getRegister, getLogin, getDashboard, postRegister, postLogin, logout } = require("./../Controllers/UserController.controllers");
const { isLoggedIn, is_authenticated } = require("./../Middlewares/Auth.middlewares");

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.get("/dashboard", isLoggedIn, getDashboard);

Router.route("/login").all(is_authenticated).get(getLogin).post(postLogin);

Router.route("/register").all(is_authenticated).get(getRegister).post(postRegister);

Router.get('/logout', logout)

module.exports = Router;