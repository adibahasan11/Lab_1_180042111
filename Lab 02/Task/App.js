const express = require('express');
const app = express();

const UserRoutes = require('./Routes/UserRoutes.routes');

app.use(express.static('Public'));

app.use(UserRoutes);

app.get("/", (req, res) => {
    res.status(200).send("<h1> Welcome - GET </h1>");
});

app.use((req, res) => {
    res.sendFile("Page-not-Found.html", {root:"./Views/Error-Page"});;
});

module.exports = app;