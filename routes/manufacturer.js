var models = require('../models');
var express = require('express');
var router = express.Router();
router.
    get('/', function(req, res){
        models.Manufacturer.findAll()
            .then(function(models){
                res.json(models);
            })
            .catch(function(error){
                res.send(500, error);
            })
    })
    .get('/:id', function(req, res) {
        models.Manufacturer.findOne(req.params.id)
            .then(function(model) {
                res.json(model);
            })
            .catch(function(error) {
                res.send(error);
            });
    })
    .post('/', function(req, res){
        models.Manufacturer.create(req.body)
            .then(function(manufacturer){
                res.json(manufacturer);
            })
            .catch(function(error){
                res.send(500, error);
            })
    });

module.exports = router;
