const mongoose = require('mongoose');
mongoose.connect('mongodb://kunalkalra97:Kunalkalra123@ds149122.mlab.com:49122/grub_lord', {useMongoClient:true});

var userSchema = new mongoose.Schema({
    "name":String,
    "email":String,
    "password":String,
    "confirmPassword":String,
    "token":String,
    "dateAndTime":Date
});

var finalUserSchema = new mongoose.Schema({
    "name":String,
    "email":{type:String, index:true},
    "password":String
});

var resetPasswordSchema = new mongoose.Schema({
    "email":{type:String, index:true}, 
    "token":{type:String, index:true}
});

var recipeSchema = new mongoose.Schema({
    "recipeName":{type:String, index:true},
    "ingredients":JSON,
    "steps":String,
    "path":String
});

var tempUser = mongoose.model('tempusers',userSchema);
var user = mongoose.model('user', finalUserSchema);
var resetPassword = mongoose.model('resetpasswords', resetPasswordSchema);
var recipe = mongoose.model('recipes', recipeSchema);

exports.tempUser = tempUser;
exports.user = user;
exports.resetPassword = resetPassword;
exports.recipe = recipe;