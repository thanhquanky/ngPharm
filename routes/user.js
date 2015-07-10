var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
//
router.get('/', middlewares.findAllFunction(models.User, {}))
    .get('/:username', middlewares.findOneFunction(models.User, {}, "username"))
    .post('/', middlewares.createFunction(models.User))
module.exports = router;
