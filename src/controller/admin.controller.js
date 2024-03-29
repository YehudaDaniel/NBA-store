const { req, res } = require('express');
const Product = require('../models/Product.model.js');
const Order = require('../models/Order.model.js');
const User = require('../models/User.model.js');
const sharp = require('sharp');

console.log('Imported Admin Controller');



async function newProduct_C(req, res) {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
    const productData = {
        name: req.body.productName,
        price: req.body.productPrice,
        description: req.body.productDescription,
        size: req.body.productSize,
        color: req.body.productColor,
        category: req.body.productCategory,
        team: req.body.productTeam,
        image: buffer,
    }

    if(!productData.name || !productData.price || !productData.description || !productData.size || !productData.color || !productData.category || !productData.team)
        return res.status(400).json({ message: "Something went wrong with the request, please try again" }); //400 - Bad Request

    try{
        const newProduct = Product.create(productData)
            .then(async (doc) => {
                try{
                    const product = await Product.findOne( {name: doc.name, price: doc.price, description: doc.description} );
                    return res.status(201).send( {product} ); //201 - Created, sending back the homepage
                }catch(e) {
                    res.status(500).send(`Error: ${e}`); //500 - Internal Server Error
                }
            })
            .catch((err) => {
                if(err)
                    return res.status(400).send(err) //400 - Bad Request
            });
    }catch(e) {
        res.status(500).send(`Error: ${e}`);
    }
}

async function adminUpdate_C(req, res) {
    try{
        for(const update of req.body.userAdminEdit) {
            const userId = update.id;
            const isAdmin = update.checked;

            await User.findByIdAndUpdate(userId, { isAdmin });

            res.status(200).end();
        }
    }catch(e) {
        res.status(500).send(`Error: ${e}`);
    }
}

async function updateOrders_C(req, res) {
    try{
        const orderIds = req.body.orderStatusUpdates.map(update => update.id);
        const orderStatuses = req.body.orderStatusUpdates.map(update => update.status);
        const updateOperations = [];

        for(let i = 0; i < orderIds.length; i++) {
            const orderId = orderIds[i];
            const orderStatus = orderStatuses[i];

            const updateOperation = {
                updateOne: {
                    filter: { _id: orderId },
                    update: { $set: { status: orderStatus } }
                }
            };

            updateOperations.push(updateOperation);
        }

        Order.bulkWrite(updateOperations);

        res.status(200).end();
    }catch(e) {
        res.status(500).send(`Error: ${e}`);
    }
}



//-- Helper Functions --//



module.exports = {
    newProduct_C,
    adminUpdate_C,
    updateOrders_C
};