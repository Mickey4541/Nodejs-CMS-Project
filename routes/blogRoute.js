const { renderCreateBlog, createBlog, allBlog, deleteBlog, singleBlog, editBlog, rendereditBlog } = require("../controller/blog/blogController");

const router = require("express").Router()

//kohi createBlog maa gayo vani k garni vaneko
router.route("/").get(allBlog)
router.route("/createBlog").get(renderCreateBlog).post(createBlog)
router.route("/single/:id").get(singleBlog)
router.route("/delete/:id").get(deleteBlog)
router.route("/editBlog/:id").post(editBlog)
router.route("/edit/:id").get(rendereditBlog)

//we can do this as well
// router.route("/:id").get(singleBlog).post(editBlog)



module.exports = router;