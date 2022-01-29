const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const { verifyToken } = require("../middlewares/auth/verifyToken");
const { handleRegister,
        handleConfirm, 
        handleLogin,  
        handleForgotPsw,
        handleResetPsw } = require("../controllers/auth.js");

const { handleInformations } = require("../controllers/restaurantInfo");

router.post('/register', function(req, res) {
  handleRegister(req, res);
});

router.post('/confirm-registration/:id', function(req, res) {
  handleConfirm(req, res);
});

router.post('/login', function(req, res) {
  handleLogin(req, res);
});

router.post('/forgot-password', function(req, res) {
  handleForgotPsw(req, res);
});

router.post('/forgot-password/reset/:id', function(req, res) {
  handleResetPsw(req, res);
});

router.post('/update-infos/:id', function(req, res) {
  handleInformations(req, res);
});

router.get('/check-auth', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      if(err){
        console.log(err);
        res.json({statusCode: 403});
      } else {
        res.json({
          'message':'Token is valid!',
          authData
      })
      }
  })
})


module.exports = router;