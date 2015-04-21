var models = require('../models');
var express = require('express');
var router = express.Router();

router
    .get('/', function(req, res) {
        models.Drug.findAll()
            .then(function(models) {
                res.json(models);
            })
            .catch(function(error) {
                res.send(500, error);
            });
    })
    .post('/', function(req, res){
        models.Drug.create(req.body)
            .then(function(drug) {
                res.json(drug);
            })
            .catch(function(err) {
                res.send(500, err);
            })
    })

module.exports = router;
