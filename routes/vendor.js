var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
var sendServerError = middlewares.sendServerErrorFunction;
//
router
    .get('/', middlewares.findAllFunction(models.Vendor))
    .get('/:id', middlewares.findOneFunction(models.Vendor, {}, "id"))
    .post('/', middlewares.createFunction(models.Vendor))
    .delete('/:id', middlewares.destroyByIdFunction(models.Vendor));
module.exports = router;
