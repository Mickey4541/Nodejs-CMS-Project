const { renderRegisterForm, registerUser, renderLoginForm, loginUser, logOut, forgetPassword, checkForgetPassword, renderOtpForm, handleOtp, renderPasswordChangeForm, handlePasswordChange } = require("../controller/auth/authController");

const router = require("express").Router()



router.route("/register").get(renderRegisterForm).post(registerUser)
router.route("/login").get(renderLoginForm).post(loginUser)
router.route("/logout").get(logOut)
router.route("/forgetPassword").get(forgetPassword).post(checkForgetPassword)
router.route("/otp").get(renderOtpForm)
router.route("/otp/:id").post(handleOtp)
router.route("/passwordChange").get(renderPasswordChangeForm)
router.route("/passwordChange/:email/:otp").post(handlePasswordChange)
module.exports = router;