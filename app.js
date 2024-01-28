var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require("connect-flash");
const expressEjsLayout = require("express-ejs-layouts");
const passport = require("passport");
require("dotenv").config();


var indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const validateMiddleware = require('./middlewares/validate.middleware');
const { User } = require("./models/index");
const localPassport = require("./passports/local.passport");
const authMiddleware = require('./middlewares/auth.middleware');
const googlePassport = require('./passports/google.passport');
const indexMiddleware = require('./middlewares/index.middleware');

var app = express();
app.use(session({
  secret: 'Node auth',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (data, done) {
  // Kiểm tra xem user.id có tồn tại không
  if (data) {
    done(null, data);
  } else {
      done(new Error('User or user id not found'));
  }
});

passport.deserializeUser(async function (data, done) {
  try {
    let user;

    if (data.provider !== "local") {
      [user, created] = await User.findOrCreate({
        where: { email: data.email },
        defaults: { 
          name: data.displayName, 
          email: data.email,
          provider: data.provider
        }
      });
    } else {
      user = await User.findByPk(data.id);
    }

    done(null, user);
    } catch (err) {
        done(err);
    }
});

passport.use("local", localPassport);
passport.use("google", googlePassport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressEjsLayout);

app.use(indexMiddleware);
app.use(validateMiddleware);
app.use('/auth', authRouter);
app.use(authMiddleware);
app.use('/', indexRouter);

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

module.exports = app;
