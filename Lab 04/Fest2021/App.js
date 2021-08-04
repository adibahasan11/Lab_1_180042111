require('dotenv').config();

const express = require('express');
const app = express();

const session = require('express-session');
const flash = require('connect-flash');

const mongoose = require ('mongoose');

const IndexRoutes = require('./Routes/IndexRoutes.routes');
const HomeRoutes = require('./Routes/HomeRoutes.routes');
const UserRoutes = require('./Routes/UserRoutes.routes');
const MathOlympiadRoutes = require('./Routes/MathOlympiad.routes');
const PContestRoutes = require('./Routes/PContestRoutes.routes');

//Database
mongoose.connect(process.env.MongoURI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(() => {
        console.log("Connected to Database.");
    }).catch((error) => {
        console.log(error);
    }
);

app.use(express.static('Public'));

app.set('view engine', 'ejs');

app.use( session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true,
}) );

app.use( flash() );

app.use("/MathOlympiad", express.static('Public'), MathOlympiadRoutes);
app.use("/MathOlympiad/Edit", express.static('Public'), MathOlympiadRoutes);

app.use("/ProgrammingContest", express.static('Public'), PContestRoutes);
app.use("/ProgrammingContest/Edit", express.static('Public'), PContestRoutes);

app.use(HomeRoutes);
app.use(UserRoutes);
app.use(IndexRoutes);

module.exports = app;