const { renderRegisterForm, registerUser } = require("../controller/auth/authController");

const router = require("express").Router()



router.route("/register").get(renderRegisterForm).post(registerUser)


module.exports = router;