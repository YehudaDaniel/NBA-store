const express = require('express');
const adminCont = require('../controller/admin.controller');
const auth = require('../middleware/middleware');
const multer = require('multer');

const adminRouter = express.Router();

const upload = multer({
    limits: {
        fileSize: 50000000 //1MB is 1 million bytes - max set to 50MB
    },
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please upload a compatible file type'));
        }

        callback(undefined, true);

        // cb(new Error('File must be compatible'));
        // cb(undefined, true); //accept the upload of the image

    }
});

adminRouter
    .post('/newproduct', auth, upload.single('productImage'), adminCont.newProduct_C)

    .patch('/adminupdate', auth, adminCont.adminUpdate_C)




module.exports = adminRouter;