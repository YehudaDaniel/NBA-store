const userRouter = require('../routers/user.router');

const RoutesConfig = (app) => {
    app
        .use('/user', userRouter)

        .get('/', (req, res) => {
            res.render('Homepage');
        })
        .get('/map', (req, res) => {
            res.render('MapPage');
        })
};

module.exports = RoutesConfig;