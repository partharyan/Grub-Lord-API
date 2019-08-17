var express = require('express');
var router = express.Router();
var db = require('../con_db');


router.get('/', function(req, res, next) {
    if(req.session.id) {
        res.redirect('/homePage');
        return;
    }
    res.render('login', {});
});

router.post('/', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    db.user.find({email:email, password:password}, function (err, response) {
        if(!err && response.length == 0) {
            res.end("No such user found");
            return;
        }

        if (response.length == 1) {
            req.session.id = password;
            req.session.username = email;
            res.redirect('/homePage');
        }

    })
});

module.exports = router;
