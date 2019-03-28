var express = require('express');
var router = express.Router();
var con = require('../../model/config');
var Cart = require('../../model/cart_model');

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
        res.send('No cart found')
        return
        // return res.render('shopping-cart', { products: null });
    }
    var cart = new Cart(req.session.cart);
    res.send({ product: cart.generateArray(), totalPrice: cart.totalPrice });
    return
    // return res.render('shopping_cart', { product: cart.generateArray(), totalPrice: cart.totalPrice });
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