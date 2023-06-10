const express = require('express');


const userRouter = express.Router();

userRouter
    .get('/me', (req, res) => {
        res.send('Hello World');
    })


module.exports = userRouter;