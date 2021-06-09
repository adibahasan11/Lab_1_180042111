const express = require('express');
const app = express();
const UserRoutes = require('./Routes/UserRoutes.routes');

app.use(UserRoutes);

app.get("/", (req, res) => {
    //res.status(200).send("<h1> Welcome - GET </h1>");
    res.sendFile("Home.html", {root:"./Views"});
});

app.post("/", (req, res) => {
    res.status(200).send("<h1> Welcome - POST </h1>");
});

app.get("/about", (req, res) => {
    //res.cookie("username", "Adiba");
    //res.clearCookie("username");
    
    res.append("username", "Adiba");
    
    res.send("<h1> About </h1>");
});

app.get("/contact", (req, res) => {
    //res.send("<h1> Contact </h1>");
    res.json({ name: "Adiba Hasan", ID: "180042111" });
});

app.use((req, res) => {
    res.status(401).send("<h1> Page Not Found </h1>");
});

module.exports = app;