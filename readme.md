#This is day 4 start::::

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




# Now make a views folder and start the project.#   N o d e j s - C M S - P r o j e c t 
 
 
