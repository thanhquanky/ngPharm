var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
//
router.get('/', middlewares.indexFunction(models.User, {}))
module.exports = router;
