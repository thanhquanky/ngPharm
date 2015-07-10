var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
var sendServerError = middlewares.sendServerErrorFunction;
//
router.
    get('/', middlewares.findAllFunction(models.Manufacturer, {}))
    .get('/:id', middlewares.findOneFunction(models.Manufacturer, {}, "id"))
    .post('/', middlewares.createFunction(models.Manufacturer))
    .delete('/:id', middlewares.destroyByIdFunction(models.Manufacturer));
module.exports = router;
