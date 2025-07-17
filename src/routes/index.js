import userRouter from './userRoutes.js';
import toDoRouter from './todoRoutes.js';

const routes = (app) => {
    app.route('/').get((req, res) => res.status(200).send('Root Route'))
    app.use('/users', userRouter)
    app.use('/todos', toDoRouter)
}

export default routes;