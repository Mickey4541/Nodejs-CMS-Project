const { users } = require("../../model");
const bcrypt = require("bcryptjs")

exports.renderRegisterForm = (req,res)=>{
    res.render("register")
}

exports.registerUser = async (req,res)=>{
    console.log(req.body);
    const {email,username,password,confirmPassword} = req.body


    //check if password matches with confirm password
    // if(password.toLowerCase() !== confirmPassword.toLowerCase()){
    //     return res.send("Please enter same password....")
    // }


    if(password  !== confirmPassword){
        return res.send("Please enter same password....")
    }
    //insert in to table (users)
await users.create({
    email : email,
    password : bcrypt.hashSync(password, 8),
    username : username,
})
    res.redirect("/login")
}



//LOGIN STARTS FORM HERE:::::::::::::::::::::::::::::::;;;
exports.renderLoginForm = (req,res)=>{
    res.render("login")
}

exports.loginUser = (req,res)=>{
    console.log(req.body)
}