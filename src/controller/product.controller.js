const { req, res } = require('express');
const Product = require('../models/Product.model.js');

console.log('Imported Product Controller');



async function readAll_C(req, res) {
    try{
        const products = await Product.find({});
        res.status(200).send(products);
    }catch(e){
        res.status(500).json({ message: 'Something went wrong fetching the data' });
    }
}

async function delete_C(req, res) {
    try{
        const product = await Product.findByIdAndDelete(req.body.id);
        if(!product)
            return res.status(404).json({ message: 'Product not found' });
        res.status(200).end();
    }catch(e){
        res.status(500).json({ message: 'Something went wrong deleting the product' });
    }
}



//-- Helper Functions --//




module.exports = {
    readAll_C,
    delete_C,
};