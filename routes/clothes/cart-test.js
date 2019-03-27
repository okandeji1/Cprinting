'use strict';

/*
A property to store the products selected by the user, usually an array of objects.
A property to store the cart totals.
A property to store the cart totals as a formatted string to be displayed on the frontend.
*/
class Cart {
    constructor() {
        this.data = {};
        this.data.items = [];
        this.data.totals = 0;
        this.data.formattedTotals = '';
    }
    inCart(productID = 0) {
        let found = false;
        this.data.items.forEach(item => {
            if (item.id === productID) {
                found = true;
            }
        });
        return found;
    }
    calculateTotals() {
        this.data.totals = 0;
        this.data.items.forEach(item => {
            let price = item.price;
            let qty = item.qty;
            let amount = price * qty;

            this.data.totals += amount;
        });
        this.setFormattedTotals();
    }

    setFormattedTotals() {
        let format = new Intl.NumberFormat(config.locale.lang, { style: 'currency', currency: config.locale.currency });
        let totals = this.data.totals;
        this.data.formattedTotals = format.format(totals);
    }
}

/*
It's pretty clear now that we have to push products into the items array or remove them when users update the cart. We have also to update the cart totals accordingly.

However, the first thing to implement is a method that prevents duplicate products from being pushed into the cart:
*/
inCart(productID = 0) {
    let found = false;
    this.data.items.forEach(item => {
        if (item.id === productID) {
            found = true;
        }
    });
    return found;
}


/*
Each product has its own ID so we're going to use this property as a unique identifier for all products.

Now we can update both the cart totals and the formatted totals string:
*/
calculateTotals() {
    this.data.totals = 0;
    this.data.items.forEach(item => {
        let price = item.price;
        let qty = item.qty;
        let amount = price * qty;

        this.data.totals += amount;
    });
    this.setFormattedTotals();
    addToCart(product = null, qty = 1) {
        if (!this.inCart(product.product_id)) {
            let format = new Intl.NumberFormat(config.locale.lang, { style: 'currency', currency: config.locale.currency });
            let prod = {
                id: product.product_id,
                title: product.title,
                price: product.price,
                qty: qty,
                image: product.image,
                formattedPrice: format.format(product.price)
            };
            this.data.items.push(prod);
            this.calculateTotals();
        }
    }
}

setFormattedTotals() {
    let format = new Intl.NumberFormat(config.locale.lang, { style: 'currency', currency: config.locale.currency });
    let totals = this.data.totals;
    this.data.formattedTotals = format.format(totals);
}

/*
We're using NumberFormat but if you aren't planning to use large numbers of numbers, you can safely use also Number.prototype.toLocaleString().

It's time to add products to our cart:
*/
addToCart(product = null, qty = 1) {
    if (!this.inCart(product.product_id)) {
        let format = new Intl.NumberFormat(config.locale.lang, { style: 'currency', currency: config.locale.currency });
        let prod = {
            id: product.product_id,
            title: product.title,
            price: product.price,
            qty: qty,
            image: product.image,
            formattedPrice: format.format(product.price)
        };
        this.data.items.push(prod);
        this.calculateTotals();
    }
}

// Here's how products are added to the cart in our sample store:

app.post('/cart', (req, res) => {
    let qty = parseInt(req.body.qty, 10);
    let product = parseInt(req.body.product_id, 10);
    if (qty > 0 && Security.isValidNonce(req.body.nonce, req)) {
        Products.findOne({ product_id: product }).then(prod => {
            Cart.addToCart(prod, qty);
            Cart.saveCart(req);
            res.redirect('/cart');
        }).catch(err => {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

// saveCart() saves our cart into the current Express session:
saveCart(request) {
    if (request.session) {
        request.session.cart = this.data;
    }
}

// We also need to allow users to remove items from the cart:

removeFromCart(id = 0) {
    for (let i = 0; i < this.data.items.length; i++) {
        let item = this.data.items[i];
        if (item.id === id) {
            this.data.items.splice(i, 1);
            this.calculateTotals();
        }
    }

}

/*
There's a potential design problem in our cart: the cart is not automatically saved when we modify the cart data so that we have to manually invoke saveCart() in our routes. The reason behind this is that the current session is available as a property of the request object provided by Express, that is, is a middleware.

Obviously users can also empty their cart:
*/
emptyCart(request) {
    this.data.items = [];
    this.data.totals = 0;
    this.data.formattedTotals = '';
    if (request.session) {
        request.session.cart.items = [];
        request.session.cart.totals = 0;
        request.session.cart.formattedTotals = '';
    }


}

/*
To avoid problems with our session and cart class, we're simply restoring values to their original defaults. Users can empty the cart and continue shopping.

Updating the cart, instead, usually means changing the quantity of each product. For that reason, we have to set our view accordingly:
*/
`<input type="text" class="qty" name="qty[]" value="<%= product.qty %>">
<input type="hidden" name="product_id[]" value="<%= product.id%>"></input>
`
/*
We have two parallel arrays, qty and product_id. Each singular quantity points to a specific product and vice versa. In our class we have to add the following method:
*/
updateCart(ids = [], qtys = []) {
    let map = [];
    let updated = false;

    ids.forEach(id => {
        qtys.forEach(qty => {
            map.push({
                id: parseInt(id, 10),
                qty: parseInt(qty, 10)
            });
        });
    });
    map.forEach(obj => {
        this.data.items.forEach(item => {
            if (item.id === obj.id) {
                if (obj.qty > 0 && obj.qty !== item.qty) {
                    item.qty = obj.qty;
                    updated = true;
                }
            }
        });
    });
    if (updated) {
        this.calculateTotals();
    }
}

/*
The update, and the consequent recalculation of the cart's totals, can take place only when there's a difference between the quantity of a product in the cart and the quantity provided by the user.

In our route we have:
*/
app.post('/cart/update', (req, res) => {
    let ids = req.body["product_id[]"];
    let qtys = req.body["qty[]"];
    if (Security.isValidNonce(req.body.nonce, req)) {
        Cart.updateCart(ids, qtys);
        Cart.saveCart(req);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
});
module.exports = new Cart();