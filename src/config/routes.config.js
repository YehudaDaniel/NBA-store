const userRouter = require('../routers/user.router');

const RoutesConfig = (app) => {
    app
        .use('/user', userRouter)

        //-- Configuration for Pages --
        .get('/', (req, res) => {
            res.render('Homepage');
        })
        .get('/map', (req, res) => {
            res.render('MapPage');
        })
        .get('/products', (req, res) => {
            res.render('ProductsPage');
        })
        //this is a test route for everyone to change
        // .get('/pagename', (req, res) => {
        //     res.render('pagename');
        // }) //this will not work until you change it
};

module.exports = RoutesConfig;