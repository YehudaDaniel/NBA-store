const express = require('express');
const productCon = require('../controller/product.controller');
const auth = require('../middleware/middleware');


const productRouter = express.Router();

productRouter
    //-- GET Requests --//
    .get('/allproducts', auth, productCon.readAll_C)
    
    //-- PATCH Requests --//
    .patch('/update', auth, productCon.update_C)
    
    //-- DELETE Requests --//
    .delete('/delete', auth, productCon.delete_C)
    
    //-- POST Requests --//
    .post('/orderById', productCon.orderById_C)
    
    .post('/products', productCon.readByFilter_C)

    
module.exports = productRouter;