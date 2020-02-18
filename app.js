const express = require('express')
const path = require('path')
const {client} = require('../db/db_config');

//Initialises app
const app = express();


//Load View Engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var usersRouter = require('./routes/users') //Path

app.use('/users', usersRouter); // sets up the route for the user page, this links the variable to the route's folder.




//Start Server
app.listen('3000',function(){
  console.log('Server started on port 3000')
});
