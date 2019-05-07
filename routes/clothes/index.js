var express = require('express');
var router = express.Router();
var con = require('../../model/config');
var Cart = require('../../model/cart_model');

router.get('/', async(req, res) => {
    var successMsg = req.flash('success')[0]
        // Call the api to fetch product
    let viewProduct = await fetchProduct()
    if (viewProduct.hasOwnProperty('error')) {
        console.log(viewProduct.error)
        return
    } else {
        var productChunks = []
        let chunkSize = 3
        for (let i = 0; i < viewProduct.length; i += chunkSize) {
            productChunks.push(viewProduct.slice(i, i + chunkSize))
        }
        res.render('clothes/home', { layout: 'layouts/home', products: productChunks, successMsg: successMsg, noMessages: !successMsg });
    }
});

// Add item to the cart
router.get('/add-to-cart/:id', async(req, res, next) => {
    var productId = req.params.id;
    var addToCart = new Cart(req.session.cart ? req.session.cart : {});
    let cartProduct = await fetchProductById(productId);
    if (cartProduct.hasOwnProperty('error')) {
        console.log(cartProduct.error);
        return
    }
    addToCart.add(cartProduct, cartProduct[0].id);
    req.session.cart = addToCart;
    return res.redirect('/')
})

// Add item to the cart
router.get('/details/:id', async(req, res, next) => {
    var productId = req.params.id;
    let productDetail = await fetchProductById(productId);
    if (productDetail.hasOwnProperty('error')) {
        console.log(productDetail.error);
        return
    }
    return res.redirect('/', productDetail)
})

// Get the shopping cart page
router.get('/shopping-cart', (req, res, next) => {
    if (!req.session.cart) {
        return res.render('clothes/shopping_cart', { layout: 'layouts/home', products: null });
    }
    var cart = new Cart(req.session.cart);
    return res.render('clothes/shopping_cart', { layout: 'layouts/home', products: cart.generateArray(), totalPrice: cart.totalPrice });
});

// reduce Item
router.get('/reduce/:id', (req, res, next) => {
    var productId = req.params.id;
    var addToCart = new Cart(req.session.cart ? req.session.cart : {});
})

// Force user to login
function isLoggedIn(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/login');
}
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