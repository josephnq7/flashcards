const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

// app.use((req, res, next) => {
//     console.log("Hello");
//     // const err = new Error("Oh noes!");
//     // err.status = 500;
//     next();
// });

// app.use((req, res, next) => {
//     console.log("world!");
//     next();
// });

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);


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