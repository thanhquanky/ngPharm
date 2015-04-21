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
    .post('/', function(req, res){
        models.Manufacturer.create(req.body)
            .then(function(){
                res.json(drug);
            })
            .catch(function(error){
                res.send(500, error);
            })
    });
module.exports = router;