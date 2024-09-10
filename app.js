const express = require('express')
const app = express()

app.listen(3000,()=>{
    console.log("Nodejs project has started on port 3000.");
    
})

// Setting ejs:::Telling the nodejs to set view-engine to ejs.
app.set('view engine', 'ejs')

// hamile nodejs lai vanim ki form bata data lidaa json maa convert and handle gareko.
//form lai database yaa node maa submit gardaa yo dui line of code chai lekhnai parxa.
app.use(express.json())
app.use(express.urlencoded({extended:true}))







//blogs.ejs....home
app.get("/",(req,res)=>{
    res.render("blogs");
})

//createBlog.....blogpage
app.get("/createBlog",(req,res)=>{
    res.render("createBlog");
})


//adding blog/post content::::submitting form content to node js.
app.post("/createBlog", (req, res)=>{
    console.log(req.body);

    //hamile form submit garna ko lagi request garim.
    //aaba request garepaxi response ta hunai parxa.
    //so, response maa res.send gareko.
    res.send("Form Submitted Successfully");
})



