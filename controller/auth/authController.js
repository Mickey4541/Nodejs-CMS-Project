const { users } = require("../../model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");
exports.renderRegisterForm = (req, res) => {
    res.render("register")
}

exports.registerUser = async (req, res) => {
    console.log(req.body);
    const { email, username, password, confirmPassword } = req.body


    //check if password matches with confirm password
    // if(password.toLowerCase() !== confirmPassword.toLowerCase()){
    //     return res.send("Please enter same password....")
    // }


    if (password !== confirmPassword) {
        return res.send("Please enter same password....")
    }
    //insert in to table (users)
    await users.create({
        email: email,
        password: bcrypt.hashSync(password, 8),
        username: username,
    })
    res.redirect("/login")
}



//LOGIN STARTS FORM HERE:::::::::::::::::::::::::::::::;;;
exports.renderLoginForm = (req, res) => {
    res.render("login")
}

exports.loginUser = async (req, res) => {
    console.log(req.body)

    const { email, password } = req.body
    //serverside validation
    if (!email || !password) {
        return res.send("Email and password are required")
    }



    //check if that email exists or not
    //findByPk -> returns {}.{}is object.
    //findAll -> returns [{}] and this is array bhitra object.
    const associateDataWithEmail = await users.findAll({
        where: {
            email: email

        }
    })
    //aani findbypk or findone garim vani tala length ==0 garera length check
    //garako xam tyo garna paidaina.
    if (associateDataWithEmail.length == 0) {
        res.send("User with thar email doesn't exists")
    } else {
        //check if password also matches
        const associateDataWithEmailPassowrd = associateDataWithEmail[0].password
        const isMatched = bcrypt.compareSync(password, associateDataWithEmailPassowrd)//it returns true or false
        if (isMatched) {
            //Generate token here:::::::::
            const token = jwt.sign({ id: associateDataWithEmail[0].id }, process.env.SECRETKEY, {
                expiresIn: "15d"
            })
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 //15 min ko millisocond means 15 min paxi token expire hunxa,
            }) //browser maa application tab vitra cookie vanney maa save hunxa.


            console.log("This is token..." + token);

            res.send("Login Successfully")
        } else {
            res.send("Invalid password.")
        }
    }
    //if the email exist it gives=>[] and xa vaney[{name: "", password: "", email: ""}]
}

//logout wala code yo, ani authroute maa gayera route banauni:
exports.logOut = (req, res) => {
    res.clearCookie('token')
    res.redirect("/login")
}



//forget password:
exports.forgetPassword = (req, res) => {
    res.render("forgetPassword");
}
exports.checkForgetPassword = async (req, res) => {
    const email = req.body.email
    if (!email) {
        return res.send("Please provide email")
    }

    // if we have to send a bulk email to all emails present in users table, we have to just follow this method:
    //const allUsers = await users.findAll()

    // const emailExists = await users.findAll({
    //     where : {
    //         email :email
    //     }
    // })
    // if(emailExists.length == 0){
    //     res.send("User with that email doesn't exist")
    // }else{
    //     //tyo email maa otp pathauni
    //     //yo sendEmail chai uta sendEmail.js bata export gareko wala ho
    //     for(var i = 0; i < allUsers.length; i++){
    //         await sendEmail({
    //             email : allUsers[i].email,
    //             subject : "Forget Password OTP from (COMPANY_NAME)",
    //             otp : "This is bulk msg"
    //         })
    //     }

    //     res.send("Email Send Successfully.")
    // }

    //if email exist, check the user table with that email 
    const emailExists = await users.findAll({
        where: {
            email: email
        }
    })
    if (emailExists.length == 0) {
        res.send("User with that email doesn't exist")
    } else {
        //tyo email maa otp pathauni
        //yo sendEmail chai uta sendEmail.js bata export gareko wala ho
        await sendEmail({
            email: email,
            subject: "Forget Password OTP from (COMPANY_NAME)",
            otp: 1234
        })
    }

    res.send("Email Send Successfully.")
}
