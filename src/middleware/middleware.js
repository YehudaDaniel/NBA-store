//middleware for the gateways in the routes
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', ''); //in the request we have filed called Authorization which contains the string "Bearer " + the token, so we extract that
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifying the token with the secret key, making sure the token was encrypted with the same key
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }); //the token is basically the user's id as an encryption, so we find the user with that idm and the token in the tokens array

        if(!user)
            throw new Error("User not found");

        req.token = token;
        req.user = user;
        req.isAdmin = user.isAdmin;
        next();
    }catch(e){
        res.status(401).send({ error: e.toString(), message: 'Please authenticate'});
    }
};

module.exports = auth;