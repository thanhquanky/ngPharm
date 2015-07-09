var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
var sendServerError = middlewares.sendServerErrorFunction;
//

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
            .then(sendJSON(res))
            .catch(sendServerError(res));
    })
    .post('/', function(req, res){
        var newDrug = req.body;
        newDrug.manufacturer = req.body.Manufacturer.id;
        models.Drug.create(newDrug)
            .then(function(drug) {
                findOne(drug.id)
                    .then(sendJSON(res))
                    .catch(function(error) {
                        res.send(error);
                    });
            })
            .catch(sendServerError(res))
    })

module.exports = router;
