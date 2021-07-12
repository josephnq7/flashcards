const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];

app.set('view engine', 'pug');

app.use((req, res, next) => {
    console.log("Hello");
    // const err = new Error("Oh noes!");
    // err.status = 500;
    next();
});

app.use((req, res, next) => {
    console.log("world!");
    next();
});

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name});
    } else {
        res.redirect('/hello');
    }
    
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }    
});

app.post('/hello', (req, res) => {
    console.dir(req.body);
    res.cookie('username', req.body.username);
    res.redirect('/');
    
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

app.get('/cards', (req, res) => {
    res.render('card', {
        prompt: "Who is buried in Grant's tomb?",
        hint: "Think about whose tomb it is.",
        colors,
    });
});

app.use((req, res, next) => {
    const err = new Error('Not Found!');
    err.status = 404;    
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The Express app is running on port 3000!');
});