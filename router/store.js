const express = require('express');
const storeRouter = express.Router();

const storeController = require('../controller/store.controller');

storeRouter.post('/add_to_cart', storeController);
storeRouter.get('/product', storeController)

module.exports = storeRouter;