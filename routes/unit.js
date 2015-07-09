var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
//
router.get('/', function(req, res) {
    models.Unit.findAll()
        .then(sendJSON(res))
        .catch(function(error) {
            res.send(error);
        });
})

module.exports = router;
