const { sendEmail, sendForgotEmail } = require("../middlewares/auth/mail");
const Restaurant = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { checkPasswordValidity, checkEmailValidity, checkNameValidity } = require("../middlewares/auth/verifyCredentials");
 

exports.handleRegister = async (req, res) => {
    const name = req.body.restaurantName;
    const email = req.body.restaurantEmail;

    if (!checkNameValidity(name, res)) return;
    if (!(await checkEmailValidity(email, res, Restaurant))) return;
    

    try{
        const restaurant = new Restaurant({
            restaurantName: name,
            restaurantEmail: email,
            restaurantConfirmed: false
        })
        restaurant.save();

        sendEmail(name, email, restaurant);
        res.send("Check your email!");
    } catch (err) {
        console.log(err);
        res.send("Error while trying to send you the email")
    } 
}

exports.handleConfirm = async (req, res) => {
        const token = req.params.id;
        const password = req.body.password;
        if (!(await checkPasswordValidity(password, res))) return;
        let rest = await Restaurant.findOne({confirmToken: token});
        console.log("TOKEN" + rest)
        if (await Restaurant.findOne({confirmToken: token})) {
            console.log("TOKEN")
            const salt = 10;
            const hashedPsw = await bcrypt.hash(password, salt)
            Restaurant.updateOne({confirmToken: token}, {
                restaurantPsw: hashedPsw,
                restaurantConfirmed: true,
                confirmToken: '',
                confirmTokenExpires: null,
            }, (err, resp) => {
                if (err) console.log(err)
                else res.send("Your restaurant has been registered successfully")
            })
        } else {
            res.send("This Restaurant has already been confirmed!");
        }
}

exports.handleLogin = async (req, res) => {

    const email = req.body.restaurantEmail;
    const password = req.body.password;
    console.log(req.body);
    let restaurantFound = await Restaurant.findOne({ restaurantEmail: email });

    if (restaurantFound) {

        if (!restaurantFound.restaurantConfirmed) {
            res.json({
                statusCode: 403,
                message: "Your restaurant hasn\'t been confirmed yet!"
            });
        }
        else {
            let authentication = await bcrypt.compare(password, restaurantFound.restaurantPsw)
            if (authentication) {
                jwt.sign({  restaurantEmail: email,
                            restaurantName: restaurantFound.restaurantName  }, process.env.JWT_SECRET,
                            { expiresIn: '1m' }, (err, token) => {
                                res.json({
                                    token,
                                    statusCode: 200,
                                    message: "You\'ve been authenticated!"
                                });
                            });
            } else {
                res.json({
                    statusCode: 403,
                    message: "Wrong credentials!"
                });            }
        }
    } else {
        res.json({
            statusCode: 404,
            message: "An account with this email does not exist!"})
    }
}

exports.handleForgotPsw = async (req, res) => {

    const { restaurantEmail } = req.body;
    const restaurant = await Restaurant.findOne({restaurantEmail: restaurantEmail});
    
    if (restaurant) {
        const restaurantName = restaurant.restaurantName;
        sendForgotEmail(restaurantEmail, restaurantName, restaurant)
        res.send("Check your email!")
    } else {
        res.send("This email isn\'t associated to any restaurant!");
    }
}

exports.handleResetPsw = async (req, res) => {

    const token = req.params.id;
    const password = req.body.password;
 
    if (!(await checkPasswordValidity(password, res))) return;


    if (await Restaurant.findOne({resetToken: token})) {

        const salt = 10;
        const hashedPsw = await bcrypt.hash(password, salt)
        Restaurant.updateOne({resetToken: token}, {
            restaurantPsw: hashedPsw,
            resetToken: '',
            resetTokenExpires: null,
        }, (err, resp) => {
            if (err) console.log(err)
            else res.send("Your password has been changed successfully")
        })
    } else {
        res.send("This token is either expired or this restaurant doesn\'t exist!");
    }
}