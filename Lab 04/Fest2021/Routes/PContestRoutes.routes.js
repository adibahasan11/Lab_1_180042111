const express = require('express');
const bodyParser = require("body-parser");

const { getRegisterPC, postRegisterPC, getPCList, deletePC, paymentDone, teamSelected } = require("./../Controllers/PContestController.controller");
const { isLoggedIn } = require("./../Middlewares/Auth.middlewares");

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.route("/Register-Team").all(isLoggedIn).get(getRegisterPC).post(postRegisterPC);

Router.get("/Team-list", isLoggedIn, getPCList);

Router.get("/Delete/:id", isLoggedIn, deletePC);

Router.get("/PaymentDone/:id", isLoggedIn, paymentDone);

Router.get("/Selected/:id", isLoggedIn, teamSelected);

module.exports = Router;