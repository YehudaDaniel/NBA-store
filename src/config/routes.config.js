const userRouter = require('../routers/user.router');
const pagesRouter = require('../routers/pages.router');
const adminRouter = require('../routers/admin.router');
const productRouter = require('../routers/product.router');

const RoutesConfig = (app) => {
    app
        .use('/user', userRouter) //routers for regular user
        
        .use('/admin', adminRouter) //routers for admin users
        
        .use('/product', productRouter) //routers for products

        .use('/', pagesRouter) //routers for pages

        .get('*', (req, res) => {
            res.status(404).render('404page');
        })
};

module.exports = RoutesConfig;