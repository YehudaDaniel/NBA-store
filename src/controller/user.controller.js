const { req, res } = require('express');
const User = require('../models/User.model.js');
const Order = require('../models/Order.model.js');
const fs = require('fs');
const bcrypt = require('bcrypt');

console.log('Imported User Controller');

let saltRounds = 10;
//-- Functions --

//TODO: Add an expiration date for the token user helper function 'generateAuthToken'
//Function for signing up a new user - encrypting the password using bcrypt with 10 saltRounds
async function register_C(req, res) {
    bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
        if (err)
            return res.status(500).end('Something went wrong'); //500 - Internal Server Error
        const userCredentials = {
            name: req.body.fullName,
            email: req.body.email,
            address: req.body.address + ', ' + req.body.city + ', ' + req.body.country + ', ' + req.body.zipCode,
            isAdmin: false, //default signing up a user as false - not an admin
            password: encrypted
        };
        if (!userCredentials.name && !userCredentials.email && !userCredentials.address && !userCredentials.password)
            return res.status(400).json({ message: "Something went wrong with the request, please try again" }); //400 - Bad Request

        try {
            const newUser = User.create(userCredentials)
                .then(async (doc) => {
                    try {
                        const user = await User.findOne({ email: doc.email });
                        const token = await user.generateAuthToken();
                        return res.status(201).send({user, token}); //201 - Created, sending back the homepage
                    } catch (e) {
                        res.status(500).send(`Error: ${e}`); //500 - Internal Server Error
                    }
                })
                .catch((err) => {
                    if (err) {
                        return res.status(400).send(err); //400 - Bad Request
                    }
                });
        } catch (e) {
            res.status(500).send(`Error: ${e}`)
        }
    });
}

//Function for logging in a registered user
async function login_C(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email }); // Saving user data by email in the variable
        if (!user) {
            return res.status(404).json({ message: 'Could not find user' }); // 404 - Not Found
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password); // Comparing the password from the request to the password in the db
        if (!isMatch) {
            return res.status(400).json({ message: 'Something went wrong' }); // 400 - Bad Request
        }

        const token = await user.generateAuthToken(); // Generate a new token for a freshly logged in user
        req.token = token;
        res.status(200).send({user, token}); // 200 - OK
    } catch (e) {
        res.status(500).send(e);
    }
}

async function logout_C(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.cookies.token;
        });
        await req.user.save();

        req.token = null;
        req.user = null;
        req.isAdmin = null;
        res.clearCookie('token');

        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
}

async function logoutall_C(req, res) {
    try {
        req.user.tokens = [];
        await req.user.save();

        req.token = null;
        req.user = null;
        req.isAdmin = null;
        res.clearCookie('token');

        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
}

async function read_C(req, res) {
    res.send(userData(req.user, req.token));
}

async function readAll_C(req, res) {
    if(req.isAdmin === false)
        return res.status(401).json({ message: 'Unauthorized' });
    try{
        const users = await User.find({ _id: {$ne: req.user._id}}).select('-password -tokens');
        res.status(200).send(users);
    }catch(e){
        res.status(500).json({ message: 'Something went wrong fetching the data' });
    }
}

//----- Orders -----//

async function allOrders_C(req, res) {
    if(req.isAdmin === false)
        return res.status(401).json({ message: 'Unauthorized' });
    try{
        const orders = await Order.find({});
        res.status(200).send(orders);
    }catch(e){
        res.status(500).json({ message: 'Something went wrong fetching the data' });
    }
}

async function order_C(req, res) {
    const orderData = {
        user: {id: req.body.user.id, name: req.body.user.name},
        products: req.body.products,
        totalPrice: req.body.totalPrice,
    }

    if(!orderData.user || !orderData.products || !orderData.totalPrice)
        return res.status(400).json({ message: "Something went wrong with the request, please try again" }); //400 - Bad Request

    try{
        const newOrder = Order.create(orderData)
            .then(async (doc) => {
                try{
                    return res.status(201).end(); //201 - Created, sending back the homepage
                }catch(e) {
                    res.status(500).send(`Error: ${e}`); //500 - Internal Server Error
                }
            })
            .catch((err) => {
                if(err)
                    return res.status(400).send(err) //400 - Bad Request
            });
    }catch(e){
        res.status(500).send(`Error: ${e}`)
    }
}

//-- Helper Functions --//

//Function for returning the user's data in the desired format
function userData(data, token) {
    return {
        user: {
            _id: data._id,
            name: data.name,
            address: data.address,
            email: data.email,
            isAdmin: data.isAdmin,
            tokens: data.tokens,
        },
        token: token
    }
}



module.exports = {
    register_C,
    login_C,
    logout_C,
    logoutall_C,
    read_C,
    readAll_C,
    allOrders_C,
    order_C
};