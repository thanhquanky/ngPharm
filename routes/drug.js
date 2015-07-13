var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
var sendServerError = middlewares.sendServerErrorFunction;
var sendError = middlewares.sendErrorFunction;
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
    .get('/',
        middlewares.findAllFunction(models.Drug, {   include: { model: models.Manufacturer,    attributes: ["name"]}  })
    )
    .get('/:id', middlewares.findOneFunction(models.Drug, {}, "id"))
    .post('/', function(req, res){
        var newDrug = req.body;
        newDrug.manufacturer = req.body.Manufacturer.id;
        models.Drug.create(newDrug)
            .then(function(drug) {
                findOne(drug.id)
                    .then(sendJSON(res))
                    .catch(sendError(res));
            })
            .catch(sendServerError(res))
    })
    .delete('/:id', middlewares.destroyByIdFunction(models.Drug));

module.exports = router;
