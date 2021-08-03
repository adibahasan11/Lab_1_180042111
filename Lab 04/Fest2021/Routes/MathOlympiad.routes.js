const express = require('express');
const bodyParser = require("body-parser");

const { getRegisterMO, postRegisterMO, getMOList, deleteMO, paymentDone, participantSelected } = require("./../Controllers/MathOlympiad.controllers");
const { isLoggedIn } = require("./../Middlewares/Auth.middlewares");

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.route("/Register").all(isLoggedIn).get(getRegisterMO).post(postRegisterMO);

Router.get("/Participant-list", isLoggedIn, getMOList);

Router.get("/Delete/:id", isLoggedIn, deleteMO);

Router.get("/PaymentDone/:id", isLoggedIn, paymentDone);

Router.get("/Selected/:id", isLoggedIn, participantSelected);

module.exports = Router;