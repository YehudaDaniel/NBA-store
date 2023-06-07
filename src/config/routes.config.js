

export const RoutesConfig = (app) => {
    app
        .use('/user', userRouter)

        .get('/', (req, res) => {
            res.send('Hello World');
        })
};