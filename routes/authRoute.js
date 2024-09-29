const { renderRegisterForm, registerUser, renderLoginForm, loginUser, logOut, forgetPassword, checkForgetPassword, renderOtpForm, handleOtp, renderPasswordChangeForm, handlePasswordChange } = require("../controller/auth/authController");
const catchError = require("../services/catchError");

const router = require("express").Router()



router.route("/register").get(renderRegisterForm).post(registerUser)
router.route("/login").get(catchError(renderLoginForm)).post(catchError(loginUser))
router.route("/logout").get(catchError(logOut))
router.route("/forgetPassword").get(catchError(forgetPassword)).post(catchError(checkForgetPassword))
router.route("/otp").get(catchError(renderOtpForm))
router.route("/otp/:id").post(catchError(handleOtp))
router.route("/passwordChange").get(catchError(renderPasswordChangeForm))
router.route("/passwordChange/:email/:otp").post(catchError(handlePasswordChange))
module.exports = router;