const userRouter = require('../routers/user.router');

const RoutesConfig = (app) => {
    app
        .use('/user', userRouter)

        .get('/', (req, res) => {
            res.render('')
        })
};

module.exports = RoutesConfig;