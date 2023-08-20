const userRouter = require('../routers/user.router');

const RoutesConfig = (app) => {
    app
        .use('/user', userRouter)

        //-- Configuration for Pages --
        //change this to use pagesRouter and refactor the pagesRouter to use the correct pages
        .get('/', (req, res) => {
            res.render('Homepage');
        })
        .get('/map', (req, res) => {
            res.render('MapPage');
        })
        .get('/cart', (req, res) => {
            res.render('CartPage');
        }) 
        .get('/login', (req, res) => {
            res.render('Login');
        }) 
        .get('/signup', (req, res) => {
            res.render('Signup');
        }) 
        .get('/about', (req, res) => {
            res.render('AboutUs');
        }) 
        .get('/products', (req, res) => {
            res.render('ProductsPage');
        })
        .get('/product', (req, res) => {
            res.render('ProductPage');
        })
        .get('/404page', (req, res) => {
            res.render('404page');
        })
        .get('/graph', (req, res) => {
            res.render('graphPage');
        })
        
        

        //this is a test route for everyone to change
        // .get('/pagename', (req, res) => {
        //     res.render('pagename');
        // }) //this will not work until you change it
        
};

module.exports = RoutesConfig;