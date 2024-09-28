const { blogs, users } = require("../../model");
const fs = require("fs")//fs is filesystem.



exports.renderCreateBlog = (req,res)=>{
    res.render("createBlog.ejs");
}


exports.createBlog =  async (req, res)=>{
    //uta isAuthenticated.js bata aako req.user lai console gareko:
    //console.log(req.user[0].id, "UserID from createBlog");
    const blogCreateGarniUserKoId =  req.user[0].id
    //form bata haleko data haru req bhitra ko object bhitra ko (body) maa aauxa jahile pani.
    // console.log(req.body);


    //if xutta xuttai lina paryo vani....
    const title = req.body.title
    const description = req.body.description
    const subTitle = req.body.subtitle
     //This is for image.
     const fileName = req.file.filename;
     if(!title || !description || !subTitle || !req.file){
        return res.send("Please Provide title, description, subtitle and filename.")
     }
    //console.log(title, subTitle, description);
    
    //tara if yei 3 line lai destructure garnu paryo vani:
    /*const {title, subTitle, description} = req.body*/


//aaba database ko blogs vanni table maa data halna lageko::
//database maa opertion garda sadhai async await.
    await blogs.create({
        title: title,
        subTitle: subTitle,
        description: description,
        userId: blogCreateGarniUserKoId, //kun id ko user ley blog create gareko ho. yo chai mathi line no. 11 bata aako.
        image : process.env.PROJECT_URL + fileName
    })
    //hamile form submit garna ko lagi request garim.
    //aaba request garepaxi response ta hunai parxa.
    //so, response maa res.send gareko.
    res.redirect("/")
}





exports.allBlog = async (req,res)=>{
    const success = req.flash("success")
    //aaba database ko data homepage(blogs) ko card maa dekhaunu parni xa.
    //so hamile yehi blogs page maa data nikalna laako.
    //blogs vanni table bata vayejati sabai data dey vaneko.
    const allBlogs = await blogs.findAll({
        //aba yaha blogs vanney table sanga users vanni table join garna lageko.
        //join garnu parey include baata garney.
        include : {
            model : users //users is tablename and model is table.
        }
    })
    //console.log(allBlogs);
    
    //blogs vanni key maa allBlogs vanni value maa aako data pass gareko
    res.render("blogs", {blogs:allBlogs, success : success});
}





exports.singleBlog = async (req, res)=>{
    const id = req.params.id
    //second approach(destructuring)
    //const {id} = req.params

    //specific id ko data magnu/find garnu paryo aba database ko table bata.
    const blog = await blogs.findAll({
        where : {
            id : id//yo first ko id is database ko data ko id aani second id vaneko mathi ko const id = req.params.id ko id ho
        },
         //aba yaha blogs vanney table sanga users vanni table join garna lageko.
        include  : {
            model : users
        }
    })

    //second approach
    //const blog = await blogs.findByPk(id)
    //console.log(blog);
    

    //aaha samma blog maa aayera data baseko xa, aba tyo data lai singleBlog.ejs file maa pass garni.
    //aauta blog name liyera(key) data aako wala blog pass gardeko.
    res.render("singleBlogs.ejs", {blog:blog})
}






// exports.deleteBlog  = async (req,res)=>{
//     const id = req.params.id
//     //blogs vanni id bata tyo id ko blog delete gar vaneko
//     await blogs.destroy({
//         where : {
//             id : id
//         }
//     })
//     res.redirect("/")
// }
// exports.deleteBlog("/blog/:id",async (req,res)=>{
//     const id = req.params.id
//     const blog = await blog.findById(id)
//     const imageName = blog.image
 
//     fs.unlink(storage/${imageName},(err)=>{
//         if(err){
//             console.log(err)
//         }else{
//             console.log("File deleted successfully")
//         }
//     })
//     await blog.findByIdAndDelete(id)
//     res.status(200).json({
//         message : 'Blog deleted successfully'
//     })
// })

// Delete blog route
// Delete Blog Function
exports.deleteBlog = async (req, res) => {
    try {
        const id = req.params.id; // Get the blog ID from the request parameters

        // Find the blog by ID
        const blog = await blogs.findOne({
            where: {
                id: id
            }
        });

        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        // Get the image URL from the blog record
        const imageUrl = blog.image; // Assuming 'image' is the field that stores the image URL
        const lengthToCut = "http://localhost:3000/".length; // Length of the base URL
        const fileNameInUploadFolder = imageUrl.slice(lengthToCut); // Extract the file path after the base URL

        // Delete the image from the filesystem
        // const filePath = path.join(__dirname, '../uploads', fileNameInUploadFolder);
        fs.unlink("uploads/" + fileNameInUploadFolder, (err)=>{
            if (err) {
                console.log("Error while deleting the image file:", err);
            } else {
                console.log("Image file deleted successfully.");
            }
        });
        await blogs.destroy({
            where: {
                id: id
            }
        });

        // Redirect to the homepage after deletion
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).send('Server error');
    }
};







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
    //console.log(req.body);
    //const userId = req.userId
    const id = req.params.id

        // Fetch the existing blog data (old blog)
        const oldDatas = await blogs.findAll({
            where: {
                id: id
            }
        });
    
        if (oldDatas.length === 0) {
            return res.status(404).send("Blog not found");
        }

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
    //console.log(req.file);


    //edit blog maa image ko implementatioon
    //if user ley blog edit garni bela new image file halyo vani tyo file ko name env bata aako link maa concat gareko.
    //aani if file change vayena vani else wala old image kai id rahanxa.
    //basically, naya aayo vani tyo naya image ko url aani aayena vani purano j xa tei.
    // const oldDatas = await blogs.findAll({
    //     where : {
    //         id : id
    //     }
    // })
    // if(oldDatas[0].userId !== userId){
    //     return res.send("You cannot edit this Blog");
    // }
    let fileUrl;
    if(req.file){
        fileUrl = process.env.PROJECT_URL + req.file.filename

         // fs.unlink('uploads/test.txt',(err)=>{
    //     if(err){
    //         console.log("Error happens");
    //     }else{
    //         console.log("Deleted successfully");  
    //     }
    // })//unlink vaneko hatauni vaneko ho

        const oldImagePath = oldDatas[0].image
        //console.log(oldImagePath);//http://localhost:3000/1727165804877-ai img.png
        const lengthOfUnwanted = "http://localhost:3000/".length
        //console.log(lengthOfUnwanted);
        const fileNameInUploadFolder = oldImagePath.slice(lengthOfUnwanted) //lengthOfUnwanted = 22
        fs.unlink("uploads/" + fileNameInUploadFolder, (err)=>{
            if(err){
                console.log("Error while deleting file", err);
                
            }else{
                console.log("File Deleted Successfully.");
                
            }
        })
    }else{
        fileUrl = oldDatas[0].image  //old file url.
    }
    
    await blogs.update({
        title : title,
        subTitle : subTitle,
        description : description,
        image : fileUrl
    },{
        where : {
            id: id
        }
    })
    res.redirect("/single/" + id)
}





//myblogs page for specific user blogs>>>>>>>>>>>>>>>>>>>>>>......
exports.renderMyBlogs = async (req,res)=>{
    //get this users blogs
    const userId = req.userId;
    //find blogs of this userID
    //console.log(userId)
    const myBlogs = await blogs.findAll({
        where : {
            userId : userId
        },
        //if blog kasle lekhako ho tyo dekhauni vaye jun page maa dekhauni ho tyo page maa yesari include garna parxa.
        include : {
            model : users //users is tablename and model is table.
        }
    })
    res.render("myBlogs.ejs",{myBlogs : myBlogs})
}