var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var con = require('../../model/config');
var bcrypt = requre('bcrypt-nodejs');

var user = {};
user.method.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}
user.method.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}
passport.serializeUser((user, done) => {
    done(null, user.sid);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
passport.use('local.signup', new localStrategy({
    firstnameField: 'firstname',
    lastnameField: 'lastname',
    usernameField: 'email',
    passwordField: 'password',
    phoneField: 'phone',
    passwordReqToCallback: true
}, function(email, password, done) {
    let checkUserInfo = user._checkUser(email);
    if (checkUserInfo.error) {
        console.log(checkUserInfo.error);
        return
    }
    if (checkUserInfo) {
        return done(null, false, { message: 'Email already exit' })
    }
    let hashPassword = user.method.encryptPassword(password);
    let userInfo = [firstname, lastname, email, hashPassword, phone];
    //insert function to insert the records into the databse
    let newUserReg = user._registerUser(userInfo);
    if (newUserReg.hasOwnProperty('error')) {
        console.log(newUserReg.error)
        return done(err)
    }
    return done(null, newUserReg);
}))

// to check if the username and password match the details in the database 
user._checkUser = (email) => {
    return new Promise(resolve => {
        con.realConnect.query('SELECT *  FROM `users` WHERE `email` = ?', email, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                resolve(data)
            }
        });
    })
}

// Registering user query
user._registerUser = (userInfo) => {
    return new Promise(resolve => {
        con.realConnect.query('INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `phone`) VALUES(?, ?, ?, ?, ?)', userInfo, (err, done) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
            } else {
                resolve(done)
            }
        })
    })
}