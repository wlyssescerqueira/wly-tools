const express = require('express');
const routes = express.Router();

const DevControler = require('./controller/DevController');
const LikeControler = require('./controller/LikeController');
const DisLikeControler = require('./controller/DisLikeController');

//routes.post('/devs', DevControler.store);
//routes.get('/devs', DevControler.index);
//routes.get('/devs/list', DevControler.List);

//routes.post('/devs/:devId/likes', LikeControler.store);
//routes.post('/devs/:devId/dislikes', DisLikeControler.store);

routes.post('/devs' , DevControler.sqlstore);
routes.get('/devs', DevControler.sqlindex);
routes.get('/devs/list', DevControler.sqlList);

routes.post('/devs/:devId/likes', LikeControler.sqlstore);
routes.post('/devs/:devId/dislikes', DisLikeControler.sqlstore);

module.exports = routes;