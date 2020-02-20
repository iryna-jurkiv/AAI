const express = require('express');
const cookieParser = require('cookie-parser');

//Initialises app
const app = express();

require('dotenv').config(); // Sets ENV configs for DB access and other global configs

//Load View Engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


const usersRouter = require('./routes/users'); //Path
const apiRouter = require('./routes/api'); //Path

app.use('/users', usersRouter); // sets up the route for the user page, this links the variable to the route's folder.
app.use('/api', apiRouter); // sets up the route for the user page, this links the variable to the route's folder.

module.exports = app
