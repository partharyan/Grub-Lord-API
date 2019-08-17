var express = require('express');
var router = express.Router();
var db = require('../con_db');


router.get('/', function(req, res, next) {
  if(!req.session.id) {
      res.end("You do not have the Permission to Access This page");
  }
  res.render('homePage', {});
});

module.exports = router;


