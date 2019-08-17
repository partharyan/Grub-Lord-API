"use strict"
const express = require('express');
const router = express.Router();
const db = require('../con_db');
var token = '';

function validdatePasswords(password1, password2) {
    console.log("Password Length: ", password1.length)
    return ((password1 == password2) && (password1.length >= 8));
}

router.get('/', function (req, res, next) {
    res.render('resetPassword', {});
    token = req.query.token;
});

router.post('/', function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (validdatePasswords(password, confirmPassword)) {

        db.resetPassword.find({ email: email, token: token }, function (err, response) {
            if (!err && response.length == 1) {
                db.user.findOneAndUpdate({email:email}, {password:password}, function(err, doc, res) {
                    if(err) {
                        console.log("Password could not be updated", err);
                    }
                });
                db.resetPassword.remove({email:email}, function(err) {
                    console.log("Details could not be deleted", err);
                });
                res.end("Password Successfully Changed");
                return;
            }

            res.end(err);
        });


    }

});

module.exports = router;