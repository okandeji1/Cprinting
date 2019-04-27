var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var csrf = require('csurf');
var con = require('../../model/config');
var csrfProtection = csrf();
router.use(csrfProtection);
const user = {}

// dashboard
router.get('/dashboard', (req, res) => {
    res.render('clothes/admin/dashboard', { layout: 'layouts/admin' })
})

// User dashboard
router.get('/account', (req, res) => {
    res.render('clothes/account', { layout: 'layouts/clothes' })
})

// route for user logout
router.get('/logout', isLoggedIn, (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        req.logout()
        req.session.destroy((err, done) => {
            if (err) {
                console.log(err)
            } else {
                req.flash('success', 'You have successfully logged out')
                res.redirect('/user/login')
                return
            }
        })
    } else {
        // res.redirect('/login');
        return
    }
});

router.use('/', notLoggedIn, (req, res, next) => {
        next()
    })
    // Login
router.get('/login', (req, res, next) => {
    var messages = req.flash('error')
    res.render('clothes/login', {
        layout: 'layouts/clothes',
        _csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
// signup page
router.get('/signup', (req, res, next) => {
    var messages = req.flash('error')
    res.render('clothes/signup', {
        // layout: 'layouts/clothes',
        _csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

// Login User
router.post('/login', async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (req.body === "" || typeof req.body === 'undefined') {
        req.flash('error', 'Email is empty')
        res.redirect('/user/login');
        return
    }
    if (email === "" || typeof email === 'undefined') {
        req.flash('error', 'Email is empty')
        res.redirect('/user/login');
        return
    }
    //checking the password field if its empty or undefined
    if (password === "" || typeof password === 'undefined') {
        req.flash('error', 'Password is empty')
        res.redirect('/user/login');
        return;
    }
    //calling the select function to check the database if the user exist
    let loginUser = await user._checkUser(email);
    if (loginUser.hasOwnProperty('error')) {
        console.log(loginUser.error)
        return
    } else {
        // if statement to see if the user exist in the database if not return an error
        if (loginUser.length === 0) {
            req.flash('error', 'Incorrect username or password')
            res.redirect('/user/login')
            return
        }
        //comparing the password the user entered with the password from the database
        let pwd = loginUser[0].password;

        //if the comparism is false give an error else send a success
        if (!validPassword(password, pwd)) {
            req.flash('error', 'Incorrect password')
            res.redirect('/user/login')
        } else {
            req.session.user = loginUser;
            req.session.save((err) => {
                if (err) {
                    console.log(err)
                } else {
                    if (!loginUser[0].is_admin) {
                        res.redirect('/user/account')
                        return
                    } else if (loginUser[0].is_admin) {
                        res.redirect('/user/dashboard')
                        return
                    } else {
                        res.redirect('/404')
                    }
                }
            })

        }
    }
})

// Handling registering new user
router.post('/signup', async(req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;

    //regex email pattern to validate the email
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;

    //checking if the firstname field is empty or undefined
    if (firstname === "" || typeof firstname === 'undefined') {
        req.flash('error', 'First name is required')
        res.redirect('/user/signup')
        return
    }
    //checking if the lastname field is empty or undefined
    if (lastname === "" || typeof lastname === 'undefined') {
        req.flash('error', 'Last name is required')
        res.redirect('/user/signup')
        return
    }

    //checking if the email field is empty or undefined and if it matches the regex pattern
    if (email === "" || typeof email === 'undefined' || !re.test(email)) {
        req.flash('error', 'Email is required')
        res.redirect('/user/signup');
        return
    }
    //checking if the password field is empty or undefined
    if (password === "" || typeof password === 'undefined') {
        req.flash('error', 'Password is required')
        res.redirect('/user/signup')
        return
    }

    if (cpassword === "" || typeof cpassword === 'undefined') {
        req.flash('error', 'Please confirm your password')
        res.redirect('/user/signup')
        return
    }

    if (cpassword !== password) {
        req.flash('error', 'Password  do not match')
        res.redirect('/user/signup')
        return
    }

    //function to check if the user already exist in the database
    let checkUserInfo = await user._checkUser(email);
    if (checkUserInfo.hasOwnProperty('error')) {
        console.log(checkUserInfo.error)
        return
    }
    if (checkUserInfo.length) {
        req.flash('error', 'This email already exist')
        res.redirect('/user/signup')
        return
    } else {
        //passing the user submited params into an array 
        let hashPassword = encryptPassword(password)
        let userInfo = [firstname, lastname, email, hashPassword];
        //insert function to insert the records into the databse
        let userReg = await user._registerUser(userInfo);
        if (userReg.hasOwnProperty('error')) {
            console.log(userReg.error)
            return
        }
        req.flash('You have successfully registered')
        res.redirect('/user/account')
    }
});

// Encrypt password
function encryptPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

function validPassword(password, pwd) {
    return bcrypt.compareSync(password, pwd)
}
// Force user to login
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/login');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login');
}

// Delete user 
user._deleteUser = (id) => {
    return new Promise(resolved => {
        con.realConnect.query('DELETE FROM `users` WHERE `id` = ?', [id], (err, rows) => {
            if (err) {
                resolved({ "error": err });
            } else {
                resolved('The template has been deleted');
            }
        });
    })
}

// Update user info
user._editProduct = (id) => {
    return new Promise((resolved, reject) => {
        try {
            con.realConnect.query('UPDATE `users` SET `is_deliver` = 1 WHERE `id` = ?', id, (error, result) => {
                resolved(error ? { "error": error } : { "data": result })
            })
        } catch (error) {
            resolved({ "error": error })
            console.log(error)
            return
        }
    })
}

// to check if the email and password match the details in the database 
user._checkUser = (email) => {
    return new Promise(resolved => {
        con.realConnect.query('SELECT *  FROM `users` WHERE `email` = ?', [email], (err, data) => {
            if (err) {
                resolved({ 'error': 'error' + err })
            } else {
                resolved(data)
            }
        });
    })
}

// Registering user query
user._registerUser = (userInfo) => {
    return new Promise(resolved => {
        con.realConnect.query('INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`) VALUES(?, ?, ?, ?)', userInfo, (err, done) => {
            if (err) {
                resolved({ 'error': 'Error' + err })
            } else {
                resolved(done)
            }
        })
    })
}

module.exports = router;