const express = require('express');
const {client} = require('./db/db_config');

//Initialises app
const app = express();


//Load View Engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());



const usersRouter = require('./routes/users'); //Path
const apiRouter = require('./routes/api'); //Path

app.use('/users', usersRouter); // sets up the route for the user page, this links the variable to the route's folder.
app.use('/api', apiRouter); // sets up the route for the user page, this links the variable to the route's folder.




//Start Server
app.listen('3000',() => {
  console.log('Server started on port 3000')
});