const express = require('express');
const bodyParser = require("body-parser");
const isLoggedIn = require("./../Middlewares/Auth.middlewares");
const { getRegister, postRegister, getLogin, getDashboard } = require("./../Controllers/UserController.controllers")

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.get("/login", getLogin);

Router.get("/dashboard", getDashboard);

Router.route('/register').all(isLoggedIn).get(getRegister).post(postRegister);

module.exports = Router;