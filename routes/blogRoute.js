const { renderCreateBlog, createBlog, allBlog, deleteBlog, singleBlog, editBlog, rendereditBlog, renderMyBlogs } = require("../controller/blog/blogController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = require("express").Router()

//kohi createBlog maa gayo vani k garni vaneko
router.route("/").get(allBlog)
router.route("/createBlog").get(renderCreateBlog).post(isAuthenticated, createBlog)
router.route("/single/:id").get(singleBlog)
router.route("/delete/:id").get(isAuthenticated, deleteBlog)
router.route("/editBlog/:id").post(isAuthenticated, editBlog)
router.route("/edit/:id").get(isAuthenticated, rendereditBlog)
router.route("/myBlogs").get(isAuthenticated, renderMyBlogs)

//we can do this as well
// router.route("/:id").get(singleBlog).post(editBlog)



module.exports = router;