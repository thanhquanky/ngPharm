var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
var sendServerError = middlewares.sendServerErrorFunction;
//
router
    .get('/', function(req, res) {
        models.Vendor.findAll()
            .then(sendJSON(res))
            .catch(sendServerError(res));
        })
    .post('/', function(req, res) {
        models.Vendor.create(req.body)
            .then(sendJSON(res))
            .catch(sendServerError(res))
    })
module.exports = router;
