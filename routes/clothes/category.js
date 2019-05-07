var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var con = require('../../model/config');
var csrfProtection = csrf();
router.use(csrfProtection);


category = {}

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
    var messages = req.flash('error')
    res.render('clothes/admin/category', {
        layout: 'layouts/admin',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/', isLoggedIn, async(req, res, done) => {
    let name = req.body.name;
    let type = req.body.type;
    // Validation 
    req.checkBody('name', 'Category name is required').notEmpty().isLength({ max: 45 });
    req.checkBody('type', 'Please specify category type').notEmpty().isLength({ max: 45 });

    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg)
        });
        req.flash('error', messages)
        res.redirect('/')

    }
    let catInfo = await category._checkCat(name);
    if (catInfo.error) {
        console.log(catInfo.error);
        return
    }
    if (catInfo.length) {
        return done(null, false, { message: 'This category already exit' })
    } else {
        let catItem = [name, type]
        let addCat = await category._addCategory(catItem);
        if (addCat.error) {
            console.log(addCat.error);
            return
        } else {
            req.flash('success', 'You have successfully added a category')
            res.redirect('/category')
        }
    }
})

// Force user to login
function isLoggedIn(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/login');
}

// Check if category already exist
category._checkCat = (name) => {
        return new Promise(resolve => {
            con.realConnect.query('SELECT * FROM `categories` WHERE `name` = ?', [name], (err, rows) => {
                if (err) {
                    resolve({ error: err })
                } else {
                    resolve(rows)
                }
            })
        })
    }
    // Add category
category._addCategory = (catItem) => {
    return new Promise((resolve, reject) => {
        con.realConnect.query('INSERT INTO `categories`(`name`, `type`) VALUES(?, ?)', catItem, (err, rows) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
            } else {
                resolve(rows)
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