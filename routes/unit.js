var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
//
router
	.get('/', middlewares.findAllFunction(models.Unit, {}))
    .get('/:id', middlewares.findOneFunction(models.Unit, {}, "id"))
    .post('/', middlewares.createFunction(models.Unit))
    .delete('/:id', middlewares.destroyByIdFunction(models.Unit));;
module.exports = router;
