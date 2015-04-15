var models = require('../models');
var express = require('express');
var router = express.Router();

router
    .get('/', function(req, res) {
        models.Vendor.findAll()
            .then(function(models) {
                res.json(models);
            })
            .catch(function(error) {
                res.send(error);
            });
        })
    .post('/', function(req, res) {
        models.Vendor.create(req.body);
    })

module.exports = router;
