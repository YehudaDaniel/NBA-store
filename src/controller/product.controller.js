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

async function update_C(req, res) {
    try{
        if (!req.isAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const product = await Product.updateOne({ _id: req.body._id }, { $set: req.body.product });
        if(!product)
            return res.status(404).json({ message: 'Product not found' });
        res.status(200).end();
    }catch(e){
        console.log(e);
        res.status(500).json({ message: 'Something went wrong updating the product' });
    }
}

async function orderById_C(req, res) {
    try{
        const products = await Product.find({ _id: { $in: req.body.products  } });
        if(!products)
            return res.status(404).json({ message: 'Product not found' });
        res.status(200).send(products);
    }catch(e){
        res.status(500).json({ message: 'Something went wrong fetching the product' });
    }
}


//-- Helper Functions --//


// ------------------ //

module.exports = {
    readAll_C,
    delete_C,
    update_C,
    orderById_C
};