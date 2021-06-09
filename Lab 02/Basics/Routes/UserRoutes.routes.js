const express = require('express');
const bodyParser = require("body-parser");

const Router = express.Router();

Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());

Router.get("/login", (req, res)=> {
    //const id = req.query.id;
    //const username = req.query.username;
    
    const {id, username} = req.query;
    
    res.send("User with ID : " + id + " and username : " + username + " is requesting to Log In");
    //res.sendFile("Login.html", {root:"./Views/Users"});
});

Router.get("/dashboard/:id/:username", (req, res) => {
    const id = req.params.id;
    const username = req.params.username;
    res.send("User with ID : " + id + " and username : " + username + " is requesting to access the dashboard.");
})

Router.get("/register", (req, res)=> {
    res.sendFile("Register.html", {root:"./Views/Users"});
});

Router.post("/register", (req, res)=> {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const C_password = req.body.C_password

    //res.sendFile("Register.html", {root:"./Views/Users"});
    res.send("<h1>User with Email : " + email + " and username : " + username + " is requesting to access the dashboard.</h1>")
});

module.exports = Router;