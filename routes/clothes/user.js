var express = require('express');
var router = express.Router();
var con = require('../model/config');

user = {}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/register', (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    let phone = req.body.phone;

    req.checkBody('firstname', 'Please first name is required').notEmpty()
    req.checkBody('lastname', 'Please last name is required').notEmpty()
    req.checkBody('email', 'Please first name is required').isEmail()
    req.checkBody('password', 'Please password is required').notEmpty()
    req.checkBody('password2', 'Please password doesn\'t match').is(req.body.password)
    req.checkBody('phone', 'Please phone number is required').notEmpty()

    let error = req.validationError()
    if (error) {
        res.json({ 'error': error })
        return
    } else {
        let userInfo = req.body;
        let userReg = user._registerUser(userInfo);
        if (userReg.hasOwnProperty('error')) {
            console.log(userReg.error)
        } else {
            res.redirect('/login')
            res.json({ 'success': 'You have successfully register! Please login to continue' })
        }
    }
})


// Registering user
user._registerUser = (userInfo) => {
    return new Promise(resolve => {
        con.realConnect.query('INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `phone`)', userInfo, (err, done) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
            } else {
                resolve(done)
            }
        })
    })
}

module.exports = router;