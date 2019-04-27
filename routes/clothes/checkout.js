var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var con = require('../../model/config');
var Cart = require('../../model/cart_model');
var request = require('request');
var csrfProtection = csrf();
router.use(csrfProtection);

checkout = {}
router.post('/payment', (req, res, next) => {
    let user = req.session.user;
    let email = user.email;
    let amount = total;
    let reference = generatePin()
    let processPayment = checkout._makeRequest(reference, email, amount)
    processPayment.then(data => {
            res.redirect('checkout/confirmation')
        })
        .catch(error => {
            console.error(error)
        })
})

checkout._makeRequest = (reference, email, amount) => {
    return new promise(resolve => {
        options({
            url: " https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/hosted/pay",
            method: "POST",
            header: {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
            },
            data: {
                "txref": reference,
                "PBFPubkey": "FLWPUBK-23cc556f7165058a4124603fd150a8c3-X",
                "customer_email": email,
                "amount": amount,
                "currency": NGN,
                "redirect_url": "http://localhost:3000/checkout/confirmation"
            }
        });
        request(options, (err, body) => {
            if (err) {
                resolve({ 'error': 'error' + err })
                console.error(err)
            }
            resolve(body)
            console.log(body)
        })
    })
}

function generatePin() {
    var randomNum = Math.floor(Math.random() * 9999999999999);
    return "SOL-" + randomNum;
}