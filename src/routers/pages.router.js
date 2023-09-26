const express = require('express');
const productCon = require('../controller/product.controller');


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
    .get('/product/:productid', productCon.productById_C)

    .get('/products/:categoryName', (req, res) => { //TODO: might be changed to /products/:category
        res.render('ProductsPage', { category: req.params.categoryName });
    })
    .get('/graph', (req, res) => {
        res.render('graphPage');
    })
    .get('/cart', productCon.cart_C)

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
        if (req.cookies.isAdmin != 'true')
            res.redirect('/');
        else
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

    .get('/thankyou', (req, res) => {
        res.render('thankyou');
    })

    //-- Post Requests --


module.exports = pagesRouter;