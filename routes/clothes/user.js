var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var csrf = require('csurf');
var con = require('../../model/config');
var Cart = require('../../model/cart_model');
var formidable = require('formidable')
var csrfProtection = csrf();
router.use(csrfProtection);
const user = {}

// Users Page
router.get('/all-user', isLoggedIn, async(req, res) => {
    let allUsers = await user._fetchAllUser(1);
    if (allUsers.error) {
        console.log(allUsers.error)
        return
    }
    res.render('clothes/admin/user', { layout: 'layouts/admin', allUsers })
})

// dashboard
router.get('/dashboard', isLoggedIn, (req, res) => {
    res.render('clothes/admin/dashboard', { layout: 'layouts/admin' })
})

// User dashboard
router.get('/account', isLoggedIn, async(req, res) => {
    var success = req.flash('success')[0]
    let user = req.session.user;
    let userId = req.session.user[0].id
    let userOrder = await user._myOrder(userId)
    if (userOrder.error) {
        console.log(userOrder.error)
    }
    var cart;
    userOrder.forEach((order) => {
        cart = new Cart(order.cart);
        order.items = cart.generateArray()
    })
    res.render('clothes/account', { layout: 'layouts/home', user, userOrder: userOrder, _csrfToken: req.csrfToken(), success })
})

// Update User Account
router.post('/update', isLoggedIn, (req, res, done) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = './public/uploads/users';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10mb
    form.parse(req, async(err, fields, files) => {
        let phone = fields.phone;
        let address = fields.address;
        let city = fields.city;
        let state = fields.state;
        let country = fields.country;
        let image = files.image.path;
        // let category = fields.category;

        if (phone === '' || typeof phone === 'undefined') {
            req.flash('error', 'Please phone is required')
            res.redirect('/user/account')
        }
        if (address === '' || typeof address === 'undefined') {
            req.flash('error', 'Please address is required')
            res.redirect('/user/account')
        }
        if (city === '' || typeof city === 'undefined') {
            req.flash('error', 'City is required')
            res.redirect('/user/account')
        }
        if (state === '' || typeof state === 'undefined') {
            req.flash('error', 'State is required')
            res.redirect('/user/account')
        }
        if (country === '' || typeof country === 'undefined') {
            req.flash('error', 'Country is required')
            res.redirect('/user/account')
        }
        if (image === '' || typeof image === 'undefined') {
            req.flash('error', 'Please upload your image')
            res.redirect('/user/account')
        }
        let imagePath = image.split('/').pop()
        let userId = req.session.user[0].id
        let userData = [phone, address, city, state, country, imagePath]
        let newProduct = await user._updateData(userData, userId);
        if (newProduct.hasOwnProperty('error')) {
            console.log(newProduct.error)
            return
        }
        console.log('New product added')
        req.flash('success', 'You have successfully updated your profile')
        res.redirect('/user/account')
        return
        // }
    });

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
                res.redirect('/user/login')
                return
            }
        })
    } else {
        res.redirect('/404');
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
        layout: 'layouts/home',
        _csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
// signup page
router.get('/signup', (req, res, next) => {
    var messages = req.flash('error')
    res.render('clothes/signup', {
        layout: 'layouts/home',
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
        } else {
            req.flash('You have successfully registered')
            res.redirect('/user/account')
        }

    }
});

module.exports = router;

// Encrypt password
function encryptPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

function validPassword(password, pwd) {
    return bcrypt.compareSync(password, pwd)
}
// Force user to login
function isLoggedIn(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
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

user._updateData = (userData, userId) => {
    return new Promise(resolved => {
        try {
            con.realConnect.query('UPDATE `users` SET `phone` = ?, `address` = ?, `city` = ?, `state` = ?, `country` = ?, `image` = ? WHERE `id` = ?', userData, userId, (err, rows) => {
                resolved(err ? { 'error': err } : resolved(rows))
            })
        } catch (error) {
            resolved(error)
        }
    })
}

// Fetch user order
user._myOrder = (userId) => {
    return new Promise(resolved => {
        try {
            con.realConnect.query('SELECT * FROM `orders` WHERE `user_id` = ?', userId, (err, done) => {
                resolved(err ? { 'error': err } : resolved(done))
            })
        } catch (error) {
            resolved(error)
        }
    })
}

// Get all products with pagination
user._fetchAllUser = (startIndex) => {
    var startPoint
    if (typeof startIndex === 'undefined' || startIndex === '' || startIndex === 1) {
        startPoint = 0;
    } else {
        startPoint = (startIndex - 1) * 20
    }
    return new Promise(resolved => {
        con.realConnect.query('SELECT * FROM users LIMIT ?, ?', [startPoint, 20], (err, rows) => {
            if (err) {
                resolved({ "error": err })
                return
            }
            con.realConnect.query('SELECT count(*) FROM `users`', (err, done) => {
                if (err) {
                    resolved({ "error": err })
                } else {
                    let resultJson = {
                        "result": rows,
                        "meta": {
                            "totalRows": done[0]['count(*)'],
                            "counts": 20
                        }

                    }
                    resolved(resultJson);
                }
            })

        });
    })

}