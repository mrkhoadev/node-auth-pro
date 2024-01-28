var express = require('express');
var router = express.Router();
const passport = require("passport");

const loginController = require("../controllers/auth/login.controller");
const registerController = require("../controllers/auth/register.controller");
const forgotPasswordController = require('../controllers/auth/forgotPassword.controller');
const resetPasswordController = require('../controllers/auth/resetPassword.controller');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.redirect("/auth/login")
});

router.get('/login', loginController.index);
router.post("/login", loginController.handleLogin);
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {console.log(22222222222222);
    // Xử lý sau khi xác thực thành công ở đây
    res.redirect("/"); // Ví dụ: Chuyển hướng đến trang dashboard
});
router.get("/google/callback", loginController.handleLoginGoogle);


router.get('/register', registerController.index);
router.post('/register', registerController.handleRegister);

router.get('/forgot-password', forgotPasswordController.index);
router.post('/forgot-password', forgotPasswordController.handleForgotPassword);

router.get('/reset-password/:token', resetPasswordController.index);
router.post('/reset-password/:token', resetPasswordController.handleResetPassword);


module.exports = router;
