const express = require('express');
const userController = require('../controller/user.controller');
const auth = require('../middleware/middleware');


const userRouter = express.Router();

userRouter
    .get('/', (req, res) => {
        res.send("Hello");
    })
    .get('/me', auth, userController.read_C)

    .get('/users', auth, userController.readAll_C)

    //-- Post Requests --
    .post('/register', userController.register_C)
    
    .post('/login', userController.login_C)

    .post('/logout', auth, userController.logout_C)
    
    .post('/logoutall', auth, userController.logoutall_C)



module.exports = userRouter;