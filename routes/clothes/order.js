var express = require('express');
var router = express.Router();
var con = require('../../model/config');
var Cart = require('../../model/cart_model');
var stripe = require('stripe')('pk-test_Z8RrHN8qJmYA48M2FGGmpL3N')

const order = {}

// Checkout page
router.get('/checkout', isLoggedIn, (req, res, next) => {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart')
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    return res.render('clothes/checkout', {
        layout: 'layouts/home',
        total: cart.totalPrice,
        errMsg: errMsg,
        noErrors: !errMsg
    })
})

// Process Payment
router.post('/checkout', async(req, res) => {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart')
    }
    var cart = new Cart(req.session.cart);
    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "NGN",
        source: req.body.stripeToken, // obtained with Stripe js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message)
            return res.redirect('/checkout')
        }
        let userId = req.session.user[0].id;
        let name = req.body.name;
        let address = req.body.address;
        let paymentId = charge.id;
        let orderItems = [userId, cart, name, address, paymentId]
        let madeOrder = await order._saveOrder(orderItems);
        if (madeOrder.error) {
            console.log(madeOrder.error)
            return
        } else
            req.flash('success', 'Successfully bought product!')
        req.session.cart = null
        res.redirect('/')
    })
})

module.exports = router;

// Force user to login
function isLoggedIn(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/login');
}

order._saveOrder = (orderItems) => {
    return new Promise(resolved => {
        try {
            con.realConnect.query('INSERT INTO `orders`, (`user_id`, `cart`, `name`, `address`, `payment_id`) VALUES(?, ?, ?, ?, ?)', orderItems, (err, rows) => {
                resolved(err ? { 'error': err } : resolved(rows))
            })
        } catch (error) {
            resolved(error)
        }
    })
}