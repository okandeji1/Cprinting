var express = require('express');
var router = express.Router();

cprinting = {}
    /* GET home page. */
router.get('/product', async(req, res, next) => {
    let getAllProducts = await cprinting._fetchAllproduct();
    if (getAllProducts.hasOwnProperty('error')) {
        console.log(getAllProducts.error)
    }
    res.render('product', { getAllProducts: getAllProducts });
});

// Get a single product by id
router.get('/product/:_id', async(req, res, next) => {
    let id = req.params.id;
    let singleProduct = await cprinting._singleProduct(id);
    if (singleProduct.hasOwnProperty('error')) {
        console.log(singleProduct.error)
    }
    res.render('single-product', { singleProduct: singleProduct });
});

// collect product post
router.post('/product', (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let units = req.body.units;
    let price = req.body.price;
    let image = req.body.image;

    // Check for validation
    if (req.body.length === "" || req.body.length === 'undefined') {
        res.json({ 'error': 'Oops! Something went wrong' });
        return;
    }
    //checking if the firstname field is empty or undefined
    if (typeof name === "" || typeof name === 'undefined') {
        res.json({ 'error': 'Product name cannot be empty' });
        return;
    }
    //checking if the lastname field is empty or undefined
    if (typeof description === "" || typeof description === 'undefined') {
        res.json({ 'error': 'description is empty' });
        return;
    }

    //checking if the password field is empty or undefined
    if (typeof units === "" || typeof units === 'undefined') {
        res.json({ 'error': 'units is empty' })
        return;
    }

    if (typeof price === "" || typeof price === 'undefined') {
        res.json({ 'error': 'Please confirm your password' })
        return;
    }

    //checking if the phone field is empty or undefined
    if (typeof image === "" || typeof image === 'undefined') {
        res.json({ 'error': 'image is empty' });
        return;
    }

    let newProduct = await cprinting._registerUser(userInfo);
    if (newProduct.hasOwnProperty('error')) {
        console.log(newProduct.error)
        return
    }
    console.log('New product added')
        // res.redirect('/login')
    res.json({ 'success': 'You have successfully add a new product' })
    return

})

// Add a new product
cprinting._addProduct = (userInfo) => {
    return new Promise(resolve => {
        con.realConnect.query('INSERT INTO `products` (`name`, `description`, `units`, `price`, `image`) VALUES(?, ?, ?, ?, ?)', userInfo, (err, done) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
            } else {
                resolve(done)
            }
        })
    })
}

// View a single product
cprinting._singleProduct = (id) => {
    return new Promise((resolved, reject) => {
        try {
            con.realConnect.query('SELECT * FROM `products` WHERE `id` = ?', id, (error, result) => {
                resolved(error ? { "error": error } : { "data": result })
            })
        } catch (error) {
            resolved({ "error": error })
            console.log(error)
            return
        }
    })
}

// Get all products with pagination
cprinting._fetchAllproduct = (startIndex) => {
    var startPoint
    if (typeof startIndex === 'undefined' || startIndex === '' || startIndex === 1) {
        startPoint = 0;
    } else {
        startPoint = (startIndex - 1) * 20
    }
    return new Promise(resolve => {
        con.realConnect.query('SELECT * FROM messages LIMIT ?, ?', [startPoint, 20], (err, rows) => {
            if (err) {
                resolve({ "error": err })
                return
            }
            con.realConnect.query('SELECT count(*) FROM `messages`', (err, done) => {
                if (err) {
                    resolve({ "error": err })
                } else {
                    let resultJson = {
                        "result": rows,
                        "meta": {
                            "totalRows": done[0]['count(*)'],
                            "counts": 20
                        }

                    }
                    resolve(resultJson);
                }
            })

        });
    })

}

// Edit a product
cprinting._editProduct = (price, id) => {
    return new Promise((resolved, reject) => {
        try {
            con.realConnect.query('UPDATE `products` SET `price` = ? WHERE `id` = ?', [price, id], (error, result) => {
                resolved(error ? { "error": error } : { "data": result })
            })
        } catch (error) {
            resolved({ "error": error })
            console.log(error)
            return
        }
    })
}

// Add more units to a product
cprinting._addUnits = (units, id) => {
    return new Promise((resolved, reject) => {
        try {
            con.realConnect.query('UPDATE `products` SET `unit` = ? WHERE `id` = ?', [units, id], (error, result) => {
                resolved(error ? { "error": error } : { "data": result })
            })
        } catch (error) {
            resolved({ "error": error })
            console.log(error)
            return
        }
    })
}

//Delete a product
cprinting._addUnits = (id) => {
    return new Promise(resolve => {
        con.realConnect.query('DELETE FROM `products` WHERE `id` = ?', [id], (err, rows) => {
            if (err) {
                resolve({ "error": err });
            } else {
                resolve('The template has been deleted');
            }
        });
    })
}

module.exports = router;