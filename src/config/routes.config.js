const userRouter = require('../routers/user.router');
const pagesRouter = require('../routers/pages.router');

const RoutesConfig = (app) => {
    app
        .use('/user', userRouter)

        .use('/', pagesRouter)

        .get('*', (req, res) => {
            res.status(404).render('404page');
        })

        //-- Configuration for Pages --


        // .get('/about', (req, res) => {
        //     res.render('AboutUs');
        // }) 
        // .get('/404page', (req, res) => {
        //     res.render('404page');
        // })
        
        

        //this is a test route for everyone to change
        // .get('/pagename', (req, res) => {
        //     res.render('pagename');
        // }) //this will not work until you change it
        
};

module.exports = RoutesConfig;