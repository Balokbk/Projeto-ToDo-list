import express from 'express';

const routes = (app) => {
    app.route('/').get((req, res) => res.status(200).send('Root Route'));
}

export default routes;