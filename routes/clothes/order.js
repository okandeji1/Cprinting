var express = require('express');
var router = express.Router();
var con = require('../../model/config');

const order = {}

// Order a product
order._orderProduct = (quantity, address, useraId, productId) => {
    return new Promise((resolve, reject) => {
        con.realConnect.query('INSERT INTO `orders`(`quantity`, `address`, `user_id`, `product_id`) VALUES(?, ?, ?, ?)', values, (err, result) => {
            if (err) {
                resolve({ 'error': 'Error' + err })
            }
        })
    })
}

// View a single product
order._singleProduct = (id) => {
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

// to check if the username and password match the details in the database 
order._fetcUser = (id) => {
    return new Promise(resolve => {
        con.realConnect.query('SELECT *  FROM `users` WHERE `id` = ?', email, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                resolve(data)
            }
        });
    })
}

// Edit a product
order._editProduct = (id) => {
    return new Promise((resolved, reject) => {
        try {
            con.realConnect.query('UPDATE `orders` SET `is_deliver` = 1 WHERE `id` = ?', id, (error, result) => {
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
order._deleteOrder = (id) => {
    return new Promise(resolve => {
        con.realConnect.query('DELETE FROM `orders` WHERE `id` = ?', [id], (err, rows) => {
            if (err) {
                resolve({ "error": err });
            } else {
                resolve('The template has been deleted');
            }
        });
    })
}