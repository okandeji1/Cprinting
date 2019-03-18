var Product = require('../models/product');

exports.cart = async(req, res, next) => {
    var cart = req.session.cart;
    var displayCart = { items: [], total: 0 };
    var total = 0;

    //Get total
    for (var item in cart) {
        displayCart.items.push(cart[item]);
        total += (cart[item].qty * cart[item].price);
    }
    displayCart.total = total;

    //Render cart page
    res.render('cart', {
        title: "Cart",
        cart: displayCart
    });
}

exports.post = (req, res, next) => {
    req.session.cart = req.session.cart || {};
    var cart = req.session.cart;

    Product.find({ _id: req.params.id }, function(err, product) {
        if (err) throw err;
        if (cart[req.params.id]) {
            cart[req.params.id].qty++
        } else {
            cart[req.params.id] = {
                item: product._id,
                title: product.name,
                price: product.price,
                qty: 1
            }
        }
        res.redirect('/cart')
    })
}