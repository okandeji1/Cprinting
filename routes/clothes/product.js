var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var con = require('../../model/config');
var csrfProtection = csrf();
var formidable = require('formidable')
router.use(csrfProtection);

const product = {}
    /* GET home page. */
router.get('/', isLoggedIn, async(req, res) => {
    let products = await product._fetchAllproduct(1)
    let allCategories = await product._selectAllCat();
    if (products.error) {
        console.log(products.error)
    } else {
        var messages = req.flash('error')
        var success = req.flash('success')[0]
        res.render('clothes/admin/product', {
            layout: 'layouts/admin',
            products,
            allCategories,
            _csrfToken: req.csrfToken(),
            messages: messages,
            hasErrors: messages.length > 0,
            success: success,
        });
    }
});

// collect product post
router.post('/', (req, res, done) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = './public/uploads/products';
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10mb
    form.parse(req, async(err, fields, files) => {
        let name = fields.name;
        let price = fields.price;
        let unit = fields.unit;
        let description = fields.description;
        let image = files.image.path;
        // let category = fields.category;

        if (name === '' || typeof name === 'undefined') {
            req.flash('error', 'Please product name is required')
            res.redirect('/product/add-product')
        }
        if (price === '' || typeof price === 'undefined') {
            req.flash('error', 'Please Fill product price')
            res.redirect('/product/add-product')
        }
        // if (!/^[0-9]\$/.test(price)) {
        //     req.flash('error', 'Please Price must be a number value')
        //     res.redirect('/product/add-product')
        // }
        if (unit === '' || typeof unit === 'undefined') {
            req.flash('error', 'Unit is required')
            res.redirect('/product/add-product')
        }
        if (description === '' || typeof description === 'undefined') {
            req.flash('error', 'Description is required')
            res.redirect('/product/add-product')
        }
        if (image === '' || typeof image === 'undefined') {
            req.flash('error', 'Please upload a product image')
            res.redirect('/product/add-product')
        }
        // let getCat = product._getCatId(categoryId)
        // if (getCat) {
        //     console.log(getCat.error)
        //     return
        // } else {
        // let categoryId = getCat[0].id
        let categoryId = 2;
        let imagePath = image.split('/').pop()
        let productsArray = [categoryId, name, price, unit, description, imagePath]
        let newProduct = await product._addProduct(productsArray);
        if (newProduct.hasOwnProperty('error')) {
            console.log(newProduct.error)
            return
        }
        console.log('New product added')
        req.flash('success', 'You have successfully added a new product')
        res.redirect('/product/add-product')
        return
        // }
    });

})

// Get a single product by id
router.get('/product/:_id', isLoggedIn, async(req, res, next) => {
    let id = req.params.id;
    let singleProduct = await product._singleProduct(id);
    if (singleProduct.hasOwnProperty('error')) {
        console.log(singleProduct.error)
    }
    res.render('single-product', { singleProduct: singleProduct });
});


module.exports = router;

// Force user to login
function isLoggedIn(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/login');
}

// Add a new product
product._addProduct = (productsArray) => {
    return new Promise(resolved => {
        con.realConnect.query('INSERT INTO `products` (`category_id`, `name`, `price`, `units`, `description`, `image`) VALUES(?, ?, ?, ?, ?, ?)', productsArray, (err, done) => {
            if (err) {
                resolved({ 'error': 'Error' + err })
            } else {
                resolved(done)
            }
        })
    })
}

// View a single product
product._singleProduct = (id) => {
    return new Promise((resolved) => {
        try {
            con.realConnect.query('SELECT * FROM `products` WHERE `id` = ?', id, (error, result) => {
                resolved(error ? { "error": error } : { "data": result })
            })
        } catch (error) {
            resolved({ "error": error })
        }
    })
}

// Get all products with pagination
product._fetchAllproduct = (startIndex) => {
    var startPoint
    if (typeof startIndex === 'undefined' || startIndex === '' || startIndex === 1) {
        startPoint = 0;
    } else {
        startPoint = (startIndex - 1) * 20
    }
    return new Promise(resolved => {
        con.realConnect.query('SELECT * FROM products LIMIT ?, ?', [startPoint, 20], (err, rows) => {
            if (err) {
                resolved({ "error": err })
                return
            }
            con.realConnect.query('SELECT count(*) FROM `products`', (err, done) => {
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

// Edit a product
product._editProduct = (price, id) => {
    return new Promise((resolved) => {
        try {
            con.realConnect.query('UPDATE `products` SET `price` = ? WHERE `id` = ?', [price, id], (error, result) => {
                resolved(error ? { "error": error } : { "data": result })
            })
        } catch (error) {
            resolved({ "error": error })
        }
    })
}


// Get all products on the landing page
product._selectProducts = () => {
    return new Promise(resolved => {
        try {
            con.realConnect.query('SELECT * FROM `categories`', (err, result) => {
                resolved(err ? { "error": err } : { "data": result })
            })
        } catch (error) {
            resolved({ "error": error })
            console.log(error)
            return
        }
    })
}

// fetch all categories
product._selectAllCat = () => {
        return new Promise(resolved => {
            try {
                con.realConnect.query('SELECT * FROM `categories`', (err, results) => {
                    resolved(err ? { "error": err } : { "data": results })
                })
            } catch (error) {
                resolved(error)
            }
        })
    }
    // Get category id
product._getCatId = (category) => {
    return new Promise(resolved => {
        try {
            con.realConnect.query('SELECT * FROM `categories` WHERE `name` = ?', [category], (err, results) => {
                resolved(err ? { "error": err } : { "data": results })
            })
        } catch (error) {
            resolved(error)
        }
    })
}