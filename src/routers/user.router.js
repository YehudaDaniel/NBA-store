const express = require('express');
const userController = require('../controller/user.controller');


const userRouter = express.Router();

userRouter
    .get('/', (req, res) => {
        res.send("Hello");
    })

    //-- Post Requests --
    .post('/register', userController.register_C)


module.exports = userRouter;