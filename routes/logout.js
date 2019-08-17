var express = require('express');
var router = express.Router();
var db = require('../con_db');


router.get('/', function(req, res, next) {

    if(!req.session.id) {
        res.end("bad request");
        return;
    }

    req.session.destroy();
    res.redirect('/login');

});


module.exports = router;
