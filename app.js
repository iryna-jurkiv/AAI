const express = require('express');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer')
const app = express();
require('dotenv').config(); // Sets ENV configs for DB access and other global configs
const multer = require('multer')
const path = require('path')



//Load View Engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const rootRouter = require('./routes/rootRouter'); //Path
const managerRouter = require('./routes/manager'); //Path
const staffRouter = require('./routes/staff'); //Path
const usersRouter = require('./routes/hr'); //Path
const apiRouter = require('./routes/api'); //Path

app.use('/', rootRouter);
app.use('/manager', managerRouter); // sets up the route for the user page, this links the variable to the route's folder.
app.use('/hr', usersRouter); // sets up the route for the user page, this links the variable to the route's folder.
app.use('/staff', staffRouter); // sets up the route for the user page, this links the variable to the route's folder.
app.use('/api', apiRouter); // sets up the route for the user page, this links the variable to the route's folder.

module.exports = app;
