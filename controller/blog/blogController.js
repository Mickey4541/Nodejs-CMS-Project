const { blogs } = require("../../model");

exports.renderCreateBlog = (req,res)=>{
    res.render("createBlog.ejs");
}


exports.createBlog =  async (req, res)=>{
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
}





exports.allBlog = async (req,res)=>{
    //aaba database ko data homepage(blogs) ko card maa dekhaunu parni xa.
    //so hamile yehi blogs page maa data nikalna laako.
    //blogs vanni table bata vayejati sabai data dey vaneko.
    const allBlogs = await blogs.findAll()
    //console.log(allBlogs);
    
    //blogs vanni key maa allBlogs vanni value maa aako data pass gareko
    res.render("blogs", {blogs:allBlogs});
}





exports.singleBlog = async (req, res)=>{
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
}






exports.deleteBlog  = async (req,res)=>{
    const id = req.params.id
    //blogs vanni id bata tyo id ko blog delete gar vaneko
    await blogs.destroy({
        where : {
            id : id
        }
    })
    res.redirect("/")
}






exports.rendereditBlog = async (req, res)=>{
    const id = req.params.id
    //find id of that blog::
    const blog = await blogs.findAll({
        where : {
            id : id
        }
    })
    //console.log(req.params.id);
    res.render("editBlog.ejs",{blog : blog})
}






exports.editBlog = async (req,res)=>{
    console.log(req.body);
    const id = req.params.id


    //second approach but bad approach:
    // await blogs.update(req.body, {
    //     where : {
    //         id : id
    //     }
    // })
    
    //first appraoch: descructuring:::::
    // const {title, subTitle, description} = req.body

    const title = req.body.title
    const subTitle = req.body.subtitle
    const description = req.body.description

    blogs.update({
        title : title,
        subTitle : subTitle,
        description : description
    },{
        where : {
            id: id
        }
    })
    res.redirect("/single/" + id)
}
