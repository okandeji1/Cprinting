var express = require('express');
var router = express.Router();
var con = require('../../model/config');

const product = {}
    /* GET home page. */
router.get('/product', async(req, res, next) => {
    let getAllProducts = await product._fetchAllproduct();
    if (getAllProducts.hasOwnProperty('error')) {
        console.log(getAllProducts.error)
        return;
    }
    res.json({ 'success': getAllProducts })
    res.render('product', { getAllProducts });
});

// Get a single product by id
router.get('/product/:_id', async(req, res, next) => {
    let id = req.params.id;
    let singleProduct = await product._singleProduct(id);
    if (singleProduct.hasOwnProperty('error')) {
        console.log(singleProduct.error)
    }
    res.render('single-product', { singleProduct: singleProduct });
});

// collect product post
router.post('/product', async(req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let units = req.body.unit;
    let price = req.body.price;
    let image = req.body.image;

    // Check for validation
    if (req.body.length === "" || req.body.length === 'undefined') {
        res.json({ 'error': 'Oops! Something went wrong' });
        return;
    }
    //checking if the firstname field is empty or undefined
    if (name === "" || typeof name === 'undefined') {
        res.json({ 'error': 'Product name cannot be empty' });
        return;
    }
    //checking if the lastname field is empty or undefined
    if (description === "" || typeof description === 'undefined') {
        res.json({ 'error': 'description is empty' });
        return;
    }

    //checking if the password field is empty or undefined
    if (units === "" || typeof units === 'undefined') {
        res.json({ 'error': 'units is empty' })
        return;
    }

    if (price === "" || typeof price === 'undefined') {
        res.json({ 'error': 'Please confirm your password' })
        return;
    }

    //checking if the phone field is empty or undefined
    if (image === "" || typeof image === 'undefined') {
        res.json({ 'error': 'image is empty' });
        return;
    }
    let categoryId = 2;
    let productsArray = [name, description, units, price, image, categoryId]
    let newProduct = await product._addProduct(productsArray);
    if (newProduct.hasOwnProperty('error')) {
        console.log(newProduct.error)
        return
    }
    console.log('New product added')
        // res.redirect('/login')
    res.json({ 'success': 'You have successfully added a new product' })
    return

})

// Add a new product
product._addProduct = (productsArray) => {
    return new Promise(resolve => {
        con.realConnect.query('INSERT INTO `products` (`name`, `description`, `units`, `price`, `image`, categories_id) VALUES(?, ?, ?, ?, ?, ?)', productsArray, (err, done) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
            } else {
                resolve(done)
            }
        })
    })
}

// View a single product
product._singleProduct = (id) => {
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
product._fetchAllproduct = (startIndex) => {
    var startPoint
    if (typeof startIndex === 'undefined' || startIndex === '' || startIndex === 1) {
        startPoint = 0;
    } else {
        startPoint = (startIndex - 1) * 20
    }
    return new Promise(resolve => {
        con.realConnect.query('SELECT * FROM products LIMIT ?, ?', [startPoint, 20], (err, rows) => {
            if (err) {
                resolve({ "error": err })
                return
            }
            con.realConnect.query('SELECT count(*) FROM `products`', (err, done) => {
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
product._editProduct = (price, id) => {
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
product._addUnits = (units, id) => {
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
product._removeProduct = (id) => {
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

// Get all products on the landing page
product._selectProducts = () => {
    return new Promise(resolve => {
        con.realConnect.query('SELECT * FROM `products`', (err, results) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = product;
module.exports = router;


// File upload API
exports.post = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async(err, fields, files) => {

        const fileUpload = files.image;
        const uploadInfo = fields;
        console.log(fileUpload);
        console.log(uploadInfo);

        if (fileUpload.image === null) {
            req.flash('error', 'Please Fill All The Required Forms');
            res.redirect(`back`);
        }

        if (fileUpload && fileUpload.name) {
            const name = `${Math.round(Math.random() * 10000)}.${fileUpload.name.split('.').pop()}`;
            const video = `${Math.round(Math.random() * 10000)}.${fileVideo.name.split('.').pop()}`;
            const dest = path.join(__dirname, '..', 'public', 'products', name);
            const desti = path.join(__dirname, '..', 'public', 'products', video);
            const data = fs.readFileSync(fileUpload.path);
            const datas = fs.readFileSync(fileVideo.path);
            fs.writeFileSync(dest, data);
            fs.unlinkSync(fileUpload.path);
            fs.writeFileSync(desti, datas);
            fs.unlinkSync(fileVideo.path);
            uploadInfo.image = name;
            // uploadInfo.fileSize = fileUpload.size;
            // uploadInfo.fileType = fileUpload.type;
        }

        const newUpload = new Product(uploadInfo);
        // newUpload.title = req.body.title;
        // newUpload.shortDescription = req.body.shortDescription;
        // newUpload.file = uploadInfo.image;
        newUpload.save((err, data) => {
            if (err) {
                console.log(err);
            } else {
                req.flash('success_msg', 'Product Posted Successfully');
                res.redirect(`back`);
            }
        });
    });
}