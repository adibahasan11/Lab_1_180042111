const express = require('express');
const bodyParser = require("body-parser");

const { getRegister, getLogin, postRegister, postLogin, logout } = require("./../Controllers/UserController.controllers");
const { isAuthenticated } = require("./../Middlewares/Auth.middlewares");

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.route("/login").all(isAuthenticated).get(getLogin).post(postLogin);

Router.route("/register").all(isAuthenticated).get(getRegister).post(postRegister);

Router.get('/logout', logout)

module.exports = Router;