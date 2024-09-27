const { renderRegisterForm, registerUser, renderLoginForm, loginUser, logOut, forgetPassword, checkForgetPassword } = require("../controller/auth/authController");

const router = require("express").Router()



router.route("/register").get(renderRegisterForm).post(registerUser)
router.route("/login").get(renderLoginForm).post(loginUser)
router.route("/logout").get(logOut)
router.route("/forgetPassword").get(forgetPassword).post(checkForgetPassword)
module.exports = router;