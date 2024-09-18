const express = require('express');
//const { blogs, sequelize } = require('./model/index');
//const { where } = require('sequelize');
//const { renderCreateBlog, createBlog, allBlog, singleBlog, deleteBlog, rendereditBlog, editBlog } = require('./controller/blog/blogController');
const app = express()


//database connection
require("./model/index")


//server listening  
app.listen(3000,()=>{
    console.log("Nodejs project has started on port 3000.");
    
})

// Setting ejs:::Telling the nodejs to set view-engine to ejs.
app.set('view engine', 'ejs')

// hamile nodejs lai vanim ki form bata data lidaa json maa convert and handle gareko.
//form lai database yaa node maa submit gardaa yo dui line of code chai lekhnai parxa.
//simply form bata kei data aaudai xa teslai parse gar vaneko.
app.use(express.json())
app.use(express.urlencoded({extended:true}))







//blogs.ejs....home
//app.get("/",allBlog)



//aba yo code app.get ra app.post blogroute.js maa xa
// //createBlog.....blogpage
// app.get("/createBlog",renderCreateBlog)

// //hamile /createBlog wala api banayim
// //adding blog/post content::::submitting form content to node js.
// app.post("/createBlog",createBlog)

//Single blog page:::::::::::::::;;;;;;


//here :id is params
// app.get("/single/:id", singleBlog)


// //delete page>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
// app.get("/delete/:id", deleteBlog)

// //edit page>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// app.get("/edit/:id", rendereditBlog)

// app.post("/editBlog/:id", editBlog )



//css file lai access garna dey vaneko node js lai.
//external css link garna paremaa node js lai hamile aagai
//vannu parxa ki malai yo yo file access garna dey.
app.use(express.static("public"))


//ROUTES HERE
const blogRoute = require("./routes/blogRoute.js")
app.use("",blogRoute)//localhost:3000 + /createBlog ===localhost:3000/createBlog

const authRoute = require("./routes/authRoute.js")
app.use("", authRoute) //localhost:3000/register

// for ex : 
// app.use("/auth", authRoute) //localhost:3000/auth/register