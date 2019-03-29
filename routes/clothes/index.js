var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var con = require('../../model/config');
var Cart = require('../../model/cart_model');
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', async(req, res) => {
    // Call the api to fetch product
    let viewProduct = await fetchProduct()
    if (viewProduct.hasOwnProperty('error')) {
        console.log(viewProduct.error)
        return
    } else {
        res.render('clothes/index', { layout: 'layouts/clothes', viewProduct });
        return;
    }
});

// signup page
router.get('/signup', (req, res, next) => {
    var messages = req.flash('error')
    res.render('register', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
router.post('/register', passport.authenticate('local.signup', {
    successRedirect: 'Success',
    failureredirect: 'failure',
    failureFlash: true
}));
// Add item to the cart
router.get('/add-to-cart/:id', async(req, res, next) => {
    var productId = req.params.id;
    var addToCart = new Cart(req.session.cart ? req.session.cart : {});
    let cartProduct = await fetchProductById(productId);
    if (cartProduct.hasOwnProperty('error')) {
        console.log(cartProduct.error);
        return res.redirect('/');
    }
    addToCart.add(cartProduct, cartProduct[0].id);
    req.session.cart = addToCart;
    return res.redirect('/')
})

// Get the shopping cart page
router.get('/shopping-cart', (req, res, next) => {
    if (!req.session.cart) {
        return res.render('clothes/shopping_cart', { layout: 'layouts/clothes', products: null });
    }
    var cart = new Cart(req.session.cart);
    return res.render('clothes/shopping_cart', { layout: 'layouts/clothes', products: cart.generateArray(), totalPrice: cart.totalPrice });
});

// Checkout
router.get('/checkout', (req, res, next) => {
    if (!req.session.cart) {
        res.redirect('clothes/shopping_cart')
    }
    var cart = Cart(req.session.cart);
    res.render('clothes/checkout', { layout: 'layouts/clothes', total: cart.totalPrice })
})

// Api to fetch all product for display in view
function fetchProduct() {
    return new Promise(resolve => {
        con.realConnect.query('SELECT * FROM `products`', (err, done) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
                return
            } else {
                resolve(done)
            }
        })
    })
}

function fetchProductById(productId) {
    return new Promise(resolve => {
        con.realConnect.query('SELECT * FROM `products` WHERE `id` = ?', productId, (err, done) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
                return
            } else {
                resolve(done)
            }
        })
    })
}

module.exports = router;