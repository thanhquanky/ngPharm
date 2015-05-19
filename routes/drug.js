var models = require('../models');
var express = require('express');
var router = express.Router();


var findOne = function(id) {
    return models.Drug.findOne({
        where: {
            id: id
        },      
        include: {
            model: models.Manufacturer
        }
    });
}
router
    .get('/', function(req, res) {
        models.Drug.findAll({
                include: {
                    model: models.Manufacturer,
                    attributes: ["name"]
                }
            })
            .then(function(models) {
                res.json(models);
            })
            .catch(function(error) {
                res.send(500, error);
            });
    })
    .post('/', function(req, res){
        var newDrug = req.body;
        newDrug.manufacturer = req.body.Manufacturer.id;
        models.Drug.create(newDrug)
            .then(function(drug) {
                findOne(drug.id)
                    .then(function(model) {
                        res.json(model);
                    })
                    .catch(function(error) {
                        res.send(error);
                    });
            })
            .catch(function(err) {
                res.send(500, err);
            })
    })

module.exports = router;
