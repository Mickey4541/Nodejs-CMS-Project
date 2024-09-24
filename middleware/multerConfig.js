const multer = require("multer");

var storage = multer.diskStorage({
    destination : function (req, file, cb){ ///cb means callback
        //logic to validate the filetype(mimetype)
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg']
        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new Error("Invalid file type. Only Supports png, jpeg and jpg."))//cb(error)
            return;
        }
        //if filesize pani validate garnu pare, if file.size>2346........yesari gardaa hunxa
        //console.log(file.mimetype);
        
        cb(null, "./uploads/");//c(a,b)= success
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