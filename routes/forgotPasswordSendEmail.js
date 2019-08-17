const express = require('express');
const router = express.Router();
const db = require('../con_db');
const nodemailer = require('nodemailer');

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function sendEmailAndSavetoDB(email) {

    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var token = '';

    for (var i = 16; i > 0; --i) {
        token += chars[Math.round(Math.random() * (chars.length - 1))];
    }

    var resetPasswordUser = new db.resetPassword({
        email:email,
        token:token
    });

    resetPasswordUser.save(function (err) {
        if(err) {
            console.log(err);
            return;
        }
    });


    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'grublord69@gmail.com',
            pass: 'Grublord69!'
        }
    });

    // setup email 
    let mailOptions = {
        from: '"Grub Lord" <grublord69@gmail.com>',
        to: email,
        subject: 'Greetings from Grub Lord',
        html: '<p>Hi, you are requested to click the below link to reset your password. </p><br><p>http://localhost:3000/resetpassword?token=' + token + '</p>'
    };

    // send mail 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });


}

router.post('/', function (req, res, next) {

    const email = req.body.email;

    db.user.find({ email: email }, function (err, response) {
        if (!err && response.length == 1) {
            res.end("A password reset email has been sent to your provided mail ID");
            sendEmailAndSavetoDB(email);
            return;
        }

        res.end("Not a valid Email ID");
    });


});

module.exports = router;