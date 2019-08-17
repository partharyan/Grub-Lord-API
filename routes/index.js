var express = require('express');
var router = express.Router();
var db = require('../con_db');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/forgotPasswordSendEmail', function(req, res, next) {
  res.render('forgotPasswordSendEmail', {});
});

router.get('/postRecipe', function (req, res, next) {
  if(!req.session.id) {
        res.end("Please Log in to Continue!");
        return;
  }
  res.render('postRecipe', {});
});


module.exports = router;
