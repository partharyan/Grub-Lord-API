var express = require('express');
var router = express.Router();
var db = require('../con_db');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), function (req, res, next) {

    if(!req.session.id) {
        res.end("Please Log in to Continue!");
        return;
    }
    

    var ingredients = {};
    const path = req.file.path;
    const body = req.body;
    const keys = Object.keys(req.body);
    const steps = req.body.steps;
    const recipeName = (req.body.recipeName).toLowerCase();

    keys.forEach(function(element) {
        if(body[element] == '') {
            res.statusCode(400);
            res.end("One or more fields is empty, stop being a dick!");
            return;
        }
    }, this);


    
    var keyValuePairs = [];

    keys.forEach(function(element) {
        keyValuePairs.push(element);
    }, this);

    const len = (keyValuePairs.length - 2) / 2

    for (i=1; i<=len; i++) {
        ingredients[body[keyValuePairs[i]]] = body[keyValuePairs[i + len]];
    }

    console.log(ingredients);
    
    var newRecipe = new db.recipe({
        recipeName:recipeName,
        ingredients:ingredients,
        path:path        
    });
    
    newRecipe.save(function(err){
        if(!err) {
            res.sendStatus(200);
            res.end("Your recipe has been posted");
            return;
        }
        res.end("Error is", err);
    });
    
});



module.exports = router;
