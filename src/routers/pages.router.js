const express = require('express');



const pagesRouter = express.Router();

pagesRouter 
    //-- Get Requests --
    .get('/', (req, res) => {
        res.render('Homepage');
    })
    .get('/login', (req, res) => {
        if (req.cookies.token)
            res.redirect('/');
        else
            res.render('Login');
    })
    .get('/signup', (req, res) => {
        if(req.cookies.token)
            res.redirect('/');
        else
            res.render('Signup');
    })
    .get('/product', (req, res) => { //should get params (productId) for the product to display
        res.render('ProductPage');
    })
    .get('/products', (req, res) => { //TODO: might be changed to /products/:category
        res.render('ProductsPage');
    })
    .get('/graph', (req, res) => {
        res.render('graphPage');
    })
    .get('/cart', (req, res) => {
        res.render('CartPage');
    })
    .get('/map', (req, res) => {
        res.render('MapPage');
    })
    .get('/forgotpassword', (req, res) => {
        res.render('ForgotPassword');
    })
    .get('/personaldata', (req, res) => {
        res.render('Personaldata');
    })
    .get('/admin', (req, res) => {
        //TODO: add admin authentication
        res.render('AdminPage');
    })
    .get('/orders', (req, res) => {
        res.render('OrdersPage');
    })

    .get('/homepage', (req, res) => {
        res.render('HomePage');
    })
    .get('/profile', (req, res) => {
        res.render('User');
    })

    //-- Post Requests --


module.exports = pagesRouter;