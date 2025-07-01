import userRouter from './userRoutes.js';

const routes = (app) => {
    app.route('/').get((req, res) => res.status(200).send('Root Route'));
    app.use('/users', userRouter);
}

export default routes;