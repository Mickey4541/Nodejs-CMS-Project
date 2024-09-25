const { renderCreateBlog, createBlog, allBlog, deleteBlog, singleBlog, editBlog, rendereditBlog, renderMyBlogs } = require("../controller/blog/blogController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = require("express").Router()


//multerconfig.js file banai sakepaxi tyo export gareko lai yaha require gareko.
const { multer, storage} = require("../middleware/multerConfig");
const { isValidUser } = require("../middleware/validUser");
const upload = multer({storage: storage});

//kohi createBlog maa gayo vani k garni vaneko
router.route("/").get(allBlog)
router.route("/createBlog").get(isAuthenticated, renderCreateBlog).post(isAuthenticated, upload.single('image'), createBlog)//yaha hamile single image upload huni banako so, upload.single gareko. If multiple image hunthyo vani upload.array garnu parthiyo.
router.route("/single/:id").get(singleBlog)
router.route("/delete/:id").get(isAuthenticated, deleteBlog)
router.route("/editBlog/:id").post(isAuthenticated, isValidUser, upload.single('image'), editBlog)
router.route("/edit/:id").get(isAuthenticated, rendereditBlog)
router.route("/myBlogs").get(isAuthenticated, renderMyBlogs)

//we can do this as well
// router.route("/:id").get(singleBlog).post(editBlog)



module.exports = router;