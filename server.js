require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

// console.log(process.env.GOOGLE_CLIENT_ID);
// console.log(process.env.GOOGLE_SECRET);
// console.log(process.env.GOOGLE_CALLBACK);



require('./config/database');
require('./config/passport');
const indexRouter = require('./routes/index');
const matchesRouter = require('./routes/matches');
const reviewsRouter = require('./routes/reviews');
const messagesRouter = require('./routes/messages');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// mount the session middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});

// mount all routes with appropriate base paths

app.use('/matches', matchesRouter);
app.use('/', reviewsRouter);
app.use('/', messagesRouter);
app.use('/', indexRouter);

// /// bootstrap middleware...
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/matches/index.html"))
})

app.listen(5000, () => {
  console.log("Listening on port " + 5000)
})
// /// end of bootstrap middleware


// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
