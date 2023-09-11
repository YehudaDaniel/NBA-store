const express = require('express');
const { login_C } = require('../../src/controller/user.controller');


const pagesRouter = express.Router();

pagesRouter
    //-- Get Requests --
    .get('/', (req, res) => {
        res.render('Homepage');
    })
    .get('/login', (req, res) => {
        res.render('Login');
    })
    .get('/signup', (req, res) => {
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
        res.render('AdminPage');
    })
    .get('/orders', (req, res) => {
        res.render('OrdersPage');
    })

    .get('/homepage', (req, res) => {
        res.render('HomePage');
    })

    //-- Post Requests --


module.exports = pagesRouter;