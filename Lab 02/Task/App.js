const express = require('express');
const app = express();

const UserRoutes = require('./Routes/UserRoutes.routes');
const HomeRoutes = require('./Routes/HomeRoutes.routes');

app.use(express.static('Public'));

app.use(UserRoutes);
app.use(HomeRoutes);

module.exports = app;