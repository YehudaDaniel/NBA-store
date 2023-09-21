const express = require('express');
const productCon = require('../controller/product.controller');


const productRouter = express.Router();

productRouter
    //-- GET Requests --//
    .get('/products', productCon.readAll_C)

    //-- Post Requests --//

    .delete('/delete', productCon.delete_C);



module.exports = productRouter;