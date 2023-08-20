const { req, res } = require('express');
const User = require('../models/User.model.js');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

console.log('Imported User Controller');

let saltRounds = 10;
//-- Functions --

//TODO: Add an expiration date for the token user helper function 'generateAuthToken'
//Function for signing up a new user - encrypting the password using bcrypt with 10 saltRounds
async function register_C(req, res) {
    bcrypt.hash(req.body.password, saltRounds, (err, encrypted) => {
        if(err)
            return res.status(500).end('Something went wrong'); //500 - Internal Server Error
        const userCredentials = {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            isAdmin: req.body.isAdmin,
            password: encrypted
        };
        if(!userCredentials.name && !userCredentials.email && !userCredentials.address && !userCredentials.password)
            return res.status(400).json({message: "Something went wrong with the request, please try again"}); //400 - Bad Request

        try{
            const newUser = User.create(userCredentials)
                .then(async (doc) => {
                    try{
                        const token = await generateAuthToken(doc._id.toString());
                        return res.status(201).json(userData(doc, token)); //201 - Created
                    }catch(e){
                        res.status(500).send(`Error: ${e}`); //500 - Internal Server Error
                    }
                })
                .catch((err) => {
                    if(err){
                        return res.status(400).send(err); //400 - Bad Request
                    }
                });
        }catch(e){
            res.status(500).send(`Error: ${e}`)
        }
    });
}

//-- Helper Functions --//

//Function for creating a token with the jwt secret and adding it to ther user's tokens array in the db
async function generateAuthToken(userId) {
    const token = jwt.sign({_id: userId}, process.env.JWT_SECRET.toString()); // {expiresIn: '1h'}

    await User.updateOne({_id: userId}, {$push: {tokens: {token: token}}});

    return token;
}

//Function for returning the user's data in the desired format
function userData(data, token){
    return {
        user: {
            _id: data._id,
            name: data.name,
            address: data.address,
            email: data.email,
            isAdmin: data.isAdmin,
            token
        }
    }
}



module.exports = {
    register_C,
};