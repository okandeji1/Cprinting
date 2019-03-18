var express = require('express');
var router = express.Router();
var session = require('express-session');
var con = require('../../model/config');
// var bodyParser = require('body-parser')
var passwordHash = require('password-hash');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }))

user = {}
    // middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard', { layout: 'layouts/clothes' });
    } else {
        next();
    }
};

router.get('/', (req, res) => {
    res.render('clothes/index', { layout: 'layouts/clothes' });
});


/* GET home page. */
router.get('/login', sessionChecker, (req, res, next) => {
    res.render('index', { layout: 'layouts/clothes' });
});

/* GET home page. */
router.get('/register', sessionChecker, (req, res, next) => {
    res.render('register', { layout: 'layouts/clothes' });
});


// route for user's dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.render('dashboard')
    } else {
        res.redirect('/login');
    }
});

// Login User
router.post('/login', async(req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        if (typeof email === "" || typeof email === 'undefined') {
            res.json({ 'error': 'Email is empty' });
            return;
        }
        //checking the password field if its empty or undefined
        if (typeof password === "" || typeof password === 'undefined') {
            res.json({ 'error': 'Password is empty' })
            return;
        }
        //calling the select function to check the database if the user exist
        let loginUser = await user._checkUser(email);
        if (loginUser.hasOwnProperty('error')) {
            console.log(loginUser.error)
            return
        }
        // if statement to see if the user exist in the database if not return an error
        if (loginUser.length === 0) {
            res.json({ 'error': 'Incorrect username or password' })
            return
        }
        //comparing the password the user entered with the password from the database
        let pwd = loginUser[0].password;
        let dpass = passwordHash.verify(password, pwd)
            //if the comparism is false give an error else send a success
        if (dpass == false) {
            res.json({ 'error': 'Incorrect password' })
            return
        } else {
            req.session.user = user.dataValues;
            res.json({ 'success': 'Login successfully' })
            return;

        }
    })
    // route for user logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        req.session.destroy((err, done) => {
            if (err) {
                console.log(err)
            } else {
                res.json({ 'success': 'You have successfully logged out' })
                    // res.redirect('/');
                return done;
            }
        })
    } else {
        // res.redirect('/login');
        return
    }
});

// Handling registering new user
router.post('/register', async(req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    let phone = req.body.phone;

    //regex email pattern to validate the email
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;

    if (req.body.length === "" || req.body.length === 'undefined') {
        res.json({ 'error': 'Oops! Something went wrong' });
        return;
    }
    //checking if the firstname field is empty or undefined
    if (typeof firstname === "" || typeof firstname === 'undefined') {
        res.json({ 'error': 'firstname is empty' });
        return;
    }
    //checking if the lastname field is empty or undefined
    if (typeof lastname === "" || typeof lastname === 'undefined') {
        res.json({ 'error': 'lastname is empty' });
        return;
    }

    //checking if the email field is empty or undefined and if it matches the regex pattern
    if (typeof email === "" || typeof email === 'undefined' || !re.test(email)) {
        res.json({ 'error': 'incorrect email format' })
        return;
    }
    //checking if the password field is empty or undefined
    if (typeof password === "" || typeof password === 'undefined') {
        res.json({ 'error': 'Password is empty' })
        return;
    }

    if (typeof cpassword === "" || typeof cpassword === 'undefined') {
        res.json({ 'error': 'Please confirm your password' })
        return;
    }

    if (cpassword !== password) {
        res.json({ 'error': 'Password do not match' })
        return;
    }

    //checking if the phone field is empty or undefined
    if (typeof phone === "" || typeof phone === 'undefined') {
        res.json({ 'error': 'Phone is empty' });
        return;
    }
    // Checking for the length of phone number
    if (phone.length > 11 || phone.length < 11) {
        res.json({ 'error': 'Your phone number is out of range' });
        return;
    }

    let hashPassword = passwordHash.generate(password)

    //function to check if the user already exist in the database
    let checkUserInfo = await user._checkUser(email);
    if (checkUserInfo.hasOwnProperty('error')) {
        console.log(checkUserInfo.error)
        return
    }
    if (checkUserInfo.length === 0) {
        //passing the user submited params into an array 
        let userInfo = [firstname, lastname, email, hashPassword, phone];
        //insert function to insert the records into the databse
        let userReg = await user._registerUser(userInfo);
        if (userReg.hasOwnProperty('error')) {
            console.log(userReg.error)
            return
        }
        req.session.user = user.dataValues;
        console.log('New user registered!')
            // res.redirect('/login')
        res.json({ 'success': 'You have successfully register! Please login to continue' })
        return
    }
    //if the username is not in the database then insert the new record
    let existingUser = checkUserInfo[0].email;
    if (existingUser === email) {
        res.json({ 'error': 'This email already exist' })
        return;
    }
})

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

module.exports = router;