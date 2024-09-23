const multer = require("multer");

var storage = multer.diskStorage({
    destination : function (req, file, cb){ ///cb means callback
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

module.exports = {
    multer,
    storage
};


//Then we have to require multer, storage in blogroute.js file. aaha module.export gareko uta blogroute,js maa import /require garnu parxa.