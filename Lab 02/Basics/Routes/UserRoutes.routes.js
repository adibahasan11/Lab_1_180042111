const express = require('express');
const Router = express.Router();

Router.get("/login", (req, res)=> {
    res.sendFile("Login.html", {root:"./Views/Users"});
});

Router.get("/register", (req, res)=> {
    res.sendFile("Register.html", {root:"./Views/Users"});
});

module.exports = Router;