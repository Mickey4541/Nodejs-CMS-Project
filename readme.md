## steps:
- make a folder and open it in vscode.
- open terminal.
- npm init 
- npm install express ejs nodemon
- make a main file as app.js





# inside package.json, if you see 1 error in this file, do this:

- Open the settings in your IDE (e.g., in VSCode, go to File > Preferences > Settings).
Search for JSON: Schema Download and uncheck it to prevent schema auto-fetching.





# require express and port listening:
const express = require('express')
const app = express()
app.listen(3000,()=>{
    console.log("Nodejs project has started on port 3000.");
})




# configure nodemon inside package.json file and inside scripts:
-   "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  },




# Setting ejs:::Telling the nodejs to set view-engine to ejs.
app.set('view engine', 'ejs')




# check on broweser by typing localhost:3000 after adding this code:
- app.get("/",(req,res)=>{
    res.send("Hello WORLD");
})

# Now make a views folder and start the project.


# Day5::::::::::::::::::::::::::::::::::::::::::::::::::
# To connect database:
-To connect sql database we need two different package:
 - sequelize ORM hamile use garxam (type orm vanum)
 - mysql2
        There are different variation of sql like: mysql, postgresql, sqlite.
- Aba yeni version maa kun use garni vanni hunxa, here, we use mysql. hamile mysql ko pani version 2 use garna lageko xam. so, wee need to install two packages.

-commands to install are:
 - npm install sequelize mysql2
 in case of found vulnerabilities: run - npm audit fix

 - npm start(we got error showing port:3306). It means xampp is not ON. we have to start xampp.

 - now to connect database , we have to copy config folder(bdConfig.js) and model folder(blogmodel.js and index.js). And modify according to need.


 # SQL (Raw Query):(DEMO)
 - INSERT INTO content (title, subtitle, description)VALUES ('Hey', 'Sub-hey', 'desc-hey');
 - DELETE FROM content WHERE title = 'Dummy Title';
 - SELECT * FROM content;

>This sql is a raw query and time consuming, it is solved by sequelize(ORM):(DEMO):
- to insert(CREATE):
        - BLOGS.create({title: "hello", subtitle: "hello", description : "hello"})

- to SELECT(READ):
        - BLOGS.findAll(); // To get all blogs
        - BLOGS.findOne({ where: { id: 1 } }); // To get a specific record

-to delete:
        - BLOGS.destroy({ where: { id: 1 } });

-to update:
        - BLOGS.update({ description: "Updated description" }, { where: { id: 1 } });
>>>>>>>>>>>>>>>So we use sequilize here in this project for easy.

# DAY: 6::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 -Inside blogs.ejs and in card-container:::
        - <%-%> ra <%%>  yo dui ota maa difference vaneko
         <%-%> chai dynamic content dekhaudaa yaa execute gardaa use hunxa
        vaney <%%> chai js integrate garda use hunxa.

# dElete blog: day 8
        <button> <a href="/delete/<%- blog[0].id %>">Delete</a></button>


# How to import tempelates and use it??
- AAhile currently mero hello folder bhitra 
matra tempelate website xa. yesma aafai kei content change garna ta milyo tara ejs bata dynamically data fetch/tanna ta mildaina.

- Tesko lagi hello folder bhitra vako sabai code lai views bhitra leunu paryo.

 - tespaxi index.html lai index.ejs ,,,
 components.html lai components.ejs banauna paryo. Components vaneko html nai ho sayad. basically, html file lai ejs maa convert garna paryo.

 - aba tyo bnarkhar index.html file lai index.ejs banako file lai access garna paryo. tesko lagi app.js file bata access garni path banauna paryo:

 - app.get("/portfolio", (req,res)=>{
        res.render("index.ejs)
 })

 - aba yeti garera url localhost:3000/portfolio garepaxi site aauxa. Aba yo site maa dynamic content halna milyo. <%- %> yo bhitra.


 - for example: yei mathi ko code modify gareko hai for dynamic content:
 - app.get("/portfolio", (req,res)=>{
        const myData = [
                {
                        name: rajan,
                        email : rajan@gmail.com
                }
        ]
        res.render("index.ejs)
 })

 - jun yo const myData aahile database bata aai rako maanam hai:
 const myData = [
                {
                        name: rajan,
                        email : rajan@gmail.com
                }
        ]


-aba portfolio maa hero section maa hello i am rajan and i am web developer lekhya hunxa, ho tyo rajan bhandari dynamically database bata halna lageko aba:

- Static Rajan Bhandari lekhako maa, <%- myData[0].name %> lekhni ani  myData[0].email lekhni kinaki database ko data const myData maa save vaako xa.



 
# CICD:
--aauta CICD kk ho continuous deployment vanni deplo garni bela look at its details.
-- To host do this ::nodejs in render and sql in railway.


- Session: Temporary data stored on the server.
- Cookie: Small data stored on the user's browser.
- Token: A secure way to authenticate users, often passed between client and server.

# Token:
to install token:
npm install jsonwebtoken

# .env:::::
npm install dotenv

# to clear cache of git:
git rm -r --cached folderName



# to read cookie:
npm install cookie-parser

# Day 20:
-Multer = to handle files and images.
- sabai setup garera image upload vanni file maa aayo yaa aayena check garda aauta mistake hunxa dherai coders bata:
 - file haru xaina vani -> application/json(content type)
 - file haru xa vaney OR images haru halney xa vaney -> multipart/form-data(content type)

 >>>>>>.To do this multipart::
 we have to do:
 - enctype = "multipart/form-data" in         <form action="/createBlog" method="post" enctype = "multipart/form-data"> of createBlog.ejs file.(in our case now.)


 - now to view image in site:
  In browse if i type this, i must see the image: http://localhost:3000/1727111780687-nepali.jpg

  - To do this:
  we have to give a permission to nodejs to read file like we give to public/css folder.

  - Inside app.js do this:
  app.use(express.static("uploads"))


# Day 21: 
- Making navbar dynamic. MEans if we are login , navbar should show logout and if we are logged out, navbar should show login.

- locals(res.locals) : res.locals is a global variable to hold any thing.

- checking filetype while uploading.

# day 22:
edit page image implementation/ delete page maa image implementation
- understanding the concept of filesystem.
(images are not stored on databases, their link/name only stored on database)

- blog ko image update garera change garepaxi purano image lai delete garnu parney hunxa. Tesko lagi fs vanni package hunxa. fs means file system and it is builtin . Wee have to require fs in blogcontroller.js,
- to delete specific file/image , we need that fileName and path.
we have to do this:
        fs.unlink("uploads/" + fileNameInUploadFolder, (err)=>{
                if(err){
                console.log("Error while deleting file", err);
                
                }else{
                console.log("File Deleted Successfully.");
                
                }
        })

# Day 23:
sending otp to gmail using nodemailer
forge password:
npm install nodemailer.
step1: form with email input . Email halepaxi users table maa
query garney users.findAll(email). If tyo email xa vaney tyo email maa otp pathauni.

# day 24 >> validating the otp, otp expiration time:
- users table maa otp and otp expiration time(like 2 minutes) two column add garnu paryo.
- making otp dynamic and random
- making a page with input field to enter the otp
- validating the otp entered by the person.
-if form is valid, render changepassword form.

# day 26:
- displaying message using flash.
> session concept -> express-session package(npm install express-session)
> connect flash -> npm install connect-flash

 > first inside app.js
//flashing a message code:::::::::::::::::::;
//require express-session and connect-flash
const session = require("express-session")
const flash = require("connect-flash")

//setting session. nodejs lai session use gar vaneko
app.use(session({
    secret : "helloworld",
    resave : false,
    saveUninitialized : false
}))
app.use(flash())
> first invalid password message kaa bata aako xa tyo catch garni:
- tyo chai authcontroller.js maa exports.loginUser xa, tya invalid password message khojni res.send("invalid password hunxa).
- tya aba : req.flash("error", "Invalid Password")
            res.redirect("/login") yo code lekhni
> note: flash garepaxi always do a redirect.

> aba tyo login.ejs dekhauni code kaa xa tyo khojni means: inside authcontroller.js: there is a code of login:
exports.renderLoginForm = (req, res) => {
    const error = req.flash("error")
    res.render("login", {error : error})
}
> yo yaha {error : error } mathi req.flash ko key{error} pass gareko.

> Then accessing that error key/message from login.ejs inside form container:
- <div class="form-container">
        <p><%- error %></p>


