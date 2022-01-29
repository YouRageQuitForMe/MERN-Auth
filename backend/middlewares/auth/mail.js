const nodeMailer = require("nodemailer");
const crypto = require("crypto");

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'youragequitforxd@gmail.com',
      pass: process.env.MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }

});

exports.sendEmail = async (restaurantName, restaurantEmail, restaurant) => {

    restaurant.generateConfirmToken();

    transporter.sendMail({  from: 'ezorder@server.com',
                            to: restaurantEmail,
                            subject: 'EzOrder registration',
                            text: 'Your account is ready! Is this your restaurant: ' + restaurantName + '? Please confirm your email, click on this link!\n http://localhost:5000/confirm-registration/' + restaurant.confirmToken
    }), (err, info) => {
        if (err) {
            return false;
        };
        if (info.accepted) return true;
    }
}


exports.sendForgotEmail = (restaurantEmail, restaurantName, restaurant) => {
    
    restaurant.generateResetToken();
    restaurant.save();
    
    transporter.sendMail({  
        from: 'ezorder@server.com',
        to: restaurantEmail,
        subject: 'Did you forget your password (EzOrder)',
        text: 'Your password reset link has been generated! Click here:\n http://localhost:5000/forgot-password/reset/' + restaurant.resetToken
    }), (err, info) => {
    if (err) {
        return false;
    };
    if (info.accepted) return true;
    }
}
