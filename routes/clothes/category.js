var express = require('express');
var router = express.Router();
var con = require('../../model/config');

category = {}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


// Add category
category._addCategory = (quantity, address, useraId, productId) => {
    return new Promise((resolve, reject) => {
        con.realConnect.query('INSERT INTO `categories`(`quantity`, `address`, `user_id`, `product_id`) VALUES(?, ?, ?, ?)', values, (err, result) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
            }
        })
    })
}

// Delete Category query
category._deleteCategory = (id) => {
    return new Promise(resolve => {
        con.realConnect.query('DELETE FROM `category` WHERE `id` = ?', [id], (err, rows) => {
            if (err) {
                resolve({ "error": err });
            } else {
                resolve('The template has been deleted');
            }
        });
    })
}

// Get all categories
category._fetchAllCategories = (startIndex) => {
    var startPoint
    if (typeof startIndex === 'undefined' || startIndex === '' || startIndex === 1) {
        startPoint = 0;
    } else {
        startPoint = (startIndex - 1) * 20
    }
    return new Promise(resolve => {
        con.realConnect.query('SELECT * FROM categories LIMIT ?, ?', [startPoint, 20], (err, rows) => {
            if (err) {
                resolve({ "error": err })
                return
            }
            con.realConnect.query('SELECT count(*) FROM `categories`', (err, done) => {
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



module.exports = router;