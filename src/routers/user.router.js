import express from 'express';


export const userRouter = express.Router();

userRouter
    .get('/me', (req, res) => {
        res.send('Hello World');
    })