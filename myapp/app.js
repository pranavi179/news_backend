var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
// var MongoClient = require('mongodb');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var port = 8080;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// for db
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1:27017' );
mongoose.connect('mongodb://127.0.0.1:27017', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

console.log("connected");
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);

//   // for Database 
  // var conn = mongoose.connection;


// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/nodedb", { useNewUrlParser: true });
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology': true);

// var conn = MongoClient.connect('mongodb://localhost:27017/nodedb') // returns a Promise

// app.get('/', function(req, res) {
//     conn.then(client=> client.db('test').collection('test').find({}).toArray(function(err, docs) {
//         if(err) { console.error(err) }
//         res.send(JSON.stringify(docs))
//     }))
// })


// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
 
// // Connection URL
// const url = 'mongodb://localhost:27017';
 
// // Database Name
// const dbName = 'myproject';
 
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
 
//   const db = client.db(dbName);
 
//   client.close();
// });

// creating a database schema
var nameSchema = new mongoose.Schema({
  firstName: String,
  lastNameName: String
 }); 
 // create a model from schema 
 var User = mongoose.model("User", nameSchema);

// app.get("/", (req, res) => {
//   res.send("Hello World");
//  });
  
 app.listen(port, () => {
  console.log("Server listening on port " + port);
 });

 // post 
 app.post("/addname",(req,res) => {
   var myData = new User(req.body);
   myData.save()
   .then(item => {
     res.send("item saved to database");

   })
   .catch(err => {
     res.status(400).send('unable tosave to database');

   });
 });

module.exports = app;
