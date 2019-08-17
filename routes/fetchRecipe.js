var express = require('express');
var router = express.Router();
var db = require('../con_db');

router.get('/', function (req, res, next) {
    if(!req.session.id) {
        res.end("Please login to continue");
        return;
    }

    res.render('fetchRecipe', {});

});

router.post('/', function (req, res, next) {

    const recipe = req.body.recipe;
    var re = new RegExp(recipe);
    db.recipe.find({recipeName:re}, {recipeName:true, ingredients:true, steps:true}, function (err, response) {
        if(response.length == 0) {
            res.end("No Recipes were found !");
            return;
        }

        res.json(response);
    }).limit(10).sort("recipeName");

});

module.exports = router;
