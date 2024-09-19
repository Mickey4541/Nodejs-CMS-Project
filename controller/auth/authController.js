const { users } = require("../../model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
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

exports.loginUser = async(req,res)=>{
    console.log(req.body)

    const{email,password} = req.body
    //serverside validation
    if(!email || !password){
        return res.send("Email and password are required")
    }

    //check if that email exists or not
    const associateDataWithEmail = await users.findAll({
        where : {
            email : email

        }        
    })
    if(associateDataWithEmail.length == 0){
        res.send("User with thar email doesn't exists")
    }else{
        //check if password also matches
        const associateDataWithEmailPassowrd = associateDataWithEmail[0].password
        const isMatched =  bcrypt.compareSync(password, associateDataWithEmailPassowrd)//it returns true or false
        if(isMatched){
            //Generate token here:::::::::
            const token = jwt.sign({id:associateDataWithEmail[0].id},process.env.SECRETKEY, {
                expiresIn : "30d"
            })
            res.cookie('token',token) //browser maa application tab vitra cookie vanney maa save hunxa.


            console.log("THis is token..." + token);
            
            res.send("Login Successfully")
        }else{
            res.send("Invalid password.")
        }
    }
    //if the email exist it gives=>[] and xa vaney[{name: "", password: "", email: ""}]
}