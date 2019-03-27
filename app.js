var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var hbs = require('hbs')
var hbsutils = require('hbs-utils')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var users = require('./routes/clothes/user');
var products = require('./routes/clothes/product');

var app = express();

const blocks = {};
const templateUtil = hbsutils(hbs);
// export locals ato template
hbs.localsAsTemplateData(app);
app.locals.defaultPageTitle = 'CPrinting';
// view engine setup
templateUtil.registerPartials(`${__dirname}/views/partials`);
templateUtil.registerWatchedPartials(`${__dirname}/views/partials`);
templateUtil.precompilePartials();
hbs.registerPartials(`${__dirname}/views/partials`);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

// route for Home-Page
// app.get('/', sessionChecker, (req, res) => {
//     res.redirect('/login');
// });


// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', users);
app.use('/product', products);

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

// helper for select tag option
hbs.registerHelper('select', function(selected, options) {
    return options.fn(this).replace(new RegExp(` value=\"${ selected }\"`),
        '$& selected="selected"').replace(new RegExp(`>${ selected }</option>`),
        'selected="selected"$&');
});


// helper use for comparision and operator

hbs.registerHelper({
    eq: (v1, v2) => {
        return v1 === v2;
    },
    ne: (v1, v2) => {
        return v1 !== v2;
    },
    lt: (v1, v2) => {
        return v1 < v2;
    },
    gt: (v1, v2) => {
        return v1 > v2;
    },
    lte: (v1, v2) => {
        return v1 <= v2;
    },
    gte: (v1, v2) => {
        return v1 >= v2;
    },
    and: (v1, v2) => {
        return v1 && v2;
    },
    or: (v1, v2) => {
        return v1 || v2;
    }

});


// Used to increment index
hbs.registerHelper('inc', function(value, options) {
    return parseInt(value) + 1;
});

hbs.registerHelper('JSON', function(value, options) {
    return new hbs.handlebars.SafeString(JSON.stringify(value));
});


// hbs.registerPartials(`${__dirname}/views/partials`, () => {});
// hbs helpers
hbs.registerHelper('link', function(text, options) {
    var attrs = [];

    for (const prop in options.hash) {
        attrs.push(
            `${hbs.handlebars.escapeExpression(prop)}="` +
            `${hbs.handlebars.escapeExpression(options.hash[prop])}"`);
    }

    return new hbs.handlebars.SafeString(
        `<a ${attrs.join(' ')}>${hbs.handlebars.escapeExpression(text)}</a>`
    );
});

// handlebars hellper for block
hbs.registerHelper('block', function(name) {
    const val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

// handlebars helper to extend scripts
hbs.registerHelper('extend', function(name, context) {
    let block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this));
    // for older versions of handlebars, use block.push(context(this));
});


module.exports = app;