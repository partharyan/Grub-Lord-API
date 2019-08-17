var express = require('express');
var router = express.Router();
var db = require('../con_db');


router.get('/', function(req, res, next) {

    const token = req.query.token;

    db.tempUser.find({token:token}, function(err, res){
        if(err) {
            res.end(err);
            return;
        }

        console.log(res);

        if (res.length == 1) {
            db.tempUser.remove({token:token}, function (err){
                
                if(!err) {
                    var user = new db.user({
                        name:res[0].name,
                        email:res[0].email,
                        password:res[0].password
                    });

                    user.save(function (err) {
                        if(err) {
                            console.log(err);
                            return;
                        }
                    })
                }

                else {
                    console.log(err);
                }
            });
        }
    });
    res.redirect('/login');
    res.end();

});

module.exports = router;
