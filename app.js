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
app.get("/",async (req,res)=>{
    //aaba database ko data homepage(blogs) ko card maa dekhaunu parni xa.
    //so hamile yehi blogs page maa data nikalna laako.
    //blogs vanni table bata vayejati sabai data dey vaneko.
    const allBlogs = await blogs.findAll()
    console.log(allBlogs);
    
    //blogs vanni key maa allBlogs vanni value maa aako data pass gareko
    res.render("blogs", {blogs:allBlogs});
})

//createBlog.....blogpage
app.get("/createBlog",(req,res)=>{
    res.render("createBlog.ejs");
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
    res.redirect("/")
})

//Single blog page:::::::::::::::;;;;;;

//here :id is params
app.get("/single/:id", async (req, res)=>{
    const id = req.params.id
    //second approach(destructuring)
    //const {id} = req.params

    //specific id ko data magnu/find garnu paryo aba database ko table bata.
    const blog = await blogs.findAll({
        where : {
            id : id//yo first ko id is database ko data ko id aani second id vaneko mathi ko const id = req.params.id ko id ho
        }
    })

    //second approach
    //const blog = await blogs.findByPk(id)
    //console.log(blog);
    

    //aaha samma blog maa aayera data baseko xa, aba tyo data lai singleBlog.ejs file maa pass garni.
    //aauta blog name liyera(key) data aako wala blog pass gardeko.
    res.render("singleBlogs.ejs", {blog:blog})
})


//delete page>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
app.get("/delete/:id", async (req,res)=>{
    const id = req.params.id
    //blogs vanni id bata tyo id ko blog delete gar vaneko
    await blogs.destroy({
        where : {
            id : id
        }
    })
    res.redirect("/")
})



