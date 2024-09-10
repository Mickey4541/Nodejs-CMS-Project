const express = require('express');
const { blogs } = require('./model/index');
const app = express()


//database connection
require("./model/index")

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
app.get("/",(req,res)=>{
    res.render("blogs");
})

//createBlog.....blogpage
app.get("/createBlog",(req,res)=>{
    res.render("createBlog");
})

//hamile /createBlog wala api banayim
//adding blog/post content::::submitting form content to node js.
app.post("/createBlog", async (req, res)=>{
    //form bata haleko data haru req bhitra ko object bhitra ko (body) maa aauxa jahile pani.
    // console.log(req.body);


    //if xutta xuttai lina paryo vani....
    const title = req.body.title
    const description = req.body.description
    const subTitle = req.body.subtitle
    //console.log(title, subTitle, description);
    
    //tara if yei 3 line lai destructure garnu paryo vani:
    /*const {title, subTitle, description} = req.body*/


//aaba database ko blogs vanni table maa data halna lageko::
//database maa opertion garda sadhai async await.
    await blogs.create({
        title: title,
        subTitle: subTitle,
        description: description
    })
    //hamile form submit garna ko lagi request garim.
    //aaba request garepaxi response ta hunai parxa.
    //so, response maa res.send gareko.
    res.send("Form Submitted Successfully");
})



