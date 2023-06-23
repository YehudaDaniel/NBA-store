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
};

module.exports = RoutesConfig;