const express = require('express');
const app = express();

const UserRoutes = require('./Routes/UserRoutes.routes');
const HomeRoutes = require('./Routes/HomeRoutes.routes');

app.use(express.static('Public'));

app.set('view engine', 'ejs');

app.use(UserRoutes);
app.use(HomeRoutes);

module.exports = app;