const express = require('express');
const cookieParser = require('cookie-parser');

const router = require('./router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(cookieParser());

app.use(router);

app.use(async (req, res, next) => {
  return res.render('404');
});

app.use((err, req, res, next) => {
  return res.send(
    "An Error Occured, Please try again <br/><br/> <a href='/auth/login'>Login</a>"
  );
});

module.exports = app;
