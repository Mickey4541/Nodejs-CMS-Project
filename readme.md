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