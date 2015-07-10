var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
var sendServerError = middlewares.sendServerErrorFunction;
//
router.
    get('/', middlewares.indexFunction(models.Manufacturer, {}))
    .get('/:id', function(req, res) {
        models.Manufacturer.findOne(req.params.id)
            .then(sendJSON(res))
            .catch(function(error) {
                res.send(error);
            });
    })
    .post('/', function(req, res){
        models.Manufacturer.create(req.body)
            .then(sendJSON(res))
            .catch(sendServerError(res))
    });

module.exports = router;
