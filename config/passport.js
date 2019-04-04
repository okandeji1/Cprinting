var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var con = require('../model/config');
var validator = require('express-validator');
var bcrypt = require('bcrypt-nodejs');
module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.sid);
    });
    passport.deserializeUser((id, done) => {
        con.realConnect.query('SELECT * FROM `users` WHERE `id` = ?', [id], (err, rows) => {
            done(err, rows[0]);
        });
    });
    passport.use('local.signup', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passwordReqToCallback: true
    }, async(req, username, password, done) => {
        // Validation 
        req.checkBody('email', 'Email is required').notEmpty().isEmail();
        req.checkBody('password', 'Password is required').notEmpty().isLength({ min: 6 });

        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach(function(error) {
                messages.push(error.msg)
            });
            return done(null, false, req.flash('error', messages))
        }
        let checkUserInfo = await _checkUser(username);
        if (checkUserInfo.error) {
            console.log(checkUserInfo.error);
        }
        if (checkUserInfo.length) {
            return done(null, false, { message: 'Email already exit' })
        }
        let userInfo = {
            username: username,
            password: encryptPassword(password),
        }

        //insert function to insert the records into the databse
        let newUserReg = await _registerUser(userInfo);
        if (newUserReg.hasOwnProperty('error')) {
            console.log(newUserReg.error)
        }
        return done(null, newUserReg);
    }));
    passport.use('local-login', new localStrategy({
        emailField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async(req, email, password, done) => {
        req.checkBody('email', 'Invalid email type').notEmpty().isEmail();
        req.checkBody('password', 'Password is required').notEmpty().isLength({ min: 6 });

        var errors = req.validationErrors();
        if (errors) {
            var messages = [];
            errors.forEach(function(error) {
                messages.push(error.msg)
            });
            return done(null, false, req.flash('error', messages))
        }
        let loginUser = await _checkUser(email);
        if (loginUser.error) {
            console.log(loginUser.error)
        } else {
            if (!loginUser.length) {
                return done(null, false, { message: 'Incorrect email or password' })
            }
            if (!validPassword(password, loginUser[0].password)) {
                return done(null, false, { message: 'Incorrect password' })
            }
            return done(null, loginUser[0]);
        }
    }))
}

// Encrypt password
function encryptPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

function validPassword(password) {
    return bcrypt.compareSync(password, this.password)
}

// to check if the email and password match the details in the database 
function _checkUser(username) {
    return new Promise(resolve => {
        con.realConnect.query('SELECT *  FROM `users` WHERE `email` = ?', [username], (err, data) => {
            if (err) {
                console.log(err);
            } else {
                resolve(data)
            }
        });
    })
}

// Registering user query
function _registerUser(userInfo) {
    return new Promise(resolve => {
        con.realConnect.query('INSERT INTO `users` (`email`, `password`) VALUES(?, ?)', [userInfo.username, userInfo.password], (err, done) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
            } else {
                resolve(done)
            }
        })
    })
}