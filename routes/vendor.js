var models = require('../models');
var express = require('express');
var router = express.Router();

router
    .get('/', function(req, res) {
        models.Vendor.findAll()
            .then(function(vendors) {
                res.json(vendors);
            })
            .catch(function(error) {
                res.send(500, error);
            });
        })
    .post('/', function(req, res) {
        models.Vendor.create(req.body)
            .then(function(vendor) {
                res.json(vendor);
            })
            .catch(function(error) {
                res.send(500, error);
            })
    })
1
module.exports = router;
