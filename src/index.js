const express = require('express');
// const morgan = require('morgan');
// const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes/index');
const db = require('./config/db');
const methodOverride = require('method-override');
const session = require('express-session');
const exphbs = require('express-handlebars')
const port = 3443;
const app = express();

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.userSession = req.session.userData;
    next();
});

//Connect db
db.connect();

//HTTP logger
// app.use(morgan('combined'));

//Cho phep truy cap vao thu muc
app.use(express.static(path.join(__dirname, 'public')));

//body-parser
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//Template engine
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        sum: (a, b) => a + b,
        session: function (name) {
            return this.req.session[name];
        },
        ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }
});
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
