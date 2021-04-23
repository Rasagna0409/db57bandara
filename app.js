var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport= require('passport');
var LocalStrategy= require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done) {
  Account.findOne({
     username: username 
    }, function(err, user) {
      if(err) { 
        returndone(err); 
      }if(!user) {
        returndone(null, false, {
           message: 'Incorrect username.'
          });
        }if(!user.validPassword(password)) {
          returndone(null, false, { 
            message: 'Incorrect password.'});}returndone(null, user);});}))
const connectionString = 'mongodb+srv://Webappsuser:Metrix@96@cluster0.exxj1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose = require('mongoose');
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var serialsRouter = require('./routes/serials');
var starsRouter = require('./routes/stars');
var slotRouter = require('./routes/slot');
var Serial = require("./models/serial");
var resourceRouter= require('./routes/resource');

// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
 await Serial.deleteMany();
  let instance1 = new Serial({
    name: "the Ironman",
    author: 'Marvels',
    season: 2005
  });
  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved")
  });
  let instance2 = new Serial({
    name: "the flash",
    author: 'WB',
    season: 2000
  });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Second object saved")
  });
  let instance3 = new Serial({
    name: "Tom and Jerry",
    author: 'CN',
    season: 200
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third object saved")
  });
}
let reseed = true;
if (reseed) {
  recreateDB();
}
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(require('express-session')({
  secret:'keyboard cat',resave:false,saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/serials', serialsRouter);
app.use('/stars', starsRouter);
app.use('/slot', slotRouter);
app.use('/resource',resourceRouter);
// passport config
// Use the existing connection
// The Account model 
var Account=require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});
module.exports = app;