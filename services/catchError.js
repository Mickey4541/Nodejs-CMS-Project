//code to handling errors asynchoronous


//yei handle garni code middleware maa halnu paryo vani next wala use garni.

// module.exports = (fn) => {
//     return (req, res, next) => {
//         fn(req,res,next).catch((err) => {
//             return res.json({
//                 status: 500,
//                 message: err.message,
//                 fullError: err,
//             });
//         });
//     };
// };
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req,res,next).catch((err) => {
            const path = req.route.path
            req.flash("error", "Something went Wrong")
            res.redirect(path)
            return 
        });
    };
};
