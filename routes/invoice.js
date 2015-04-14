var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
        models.Invoice.findAll({
                attributes: ['id','number']
            })
            .then(function(models) {
                res.json(models);
            })
            .catch(function(error) {
                res.send(error);
            });
    })
    .get('/:invoiceId', function(req, res) {
        models.Invoice.findOne({
                where: {
                    id: req.params.invoiceId
                },
                include: [{
                    model: models.InvoiceItem,
                    attributes: ["id", "quantity", "manufactureDate", "expirationDate", "price"],
                    include: [{
                        model: models.Drug,
                        attributes: ["name"]
                    }, {
                        model: models.Unit,
                        attributes: ["name"]
                    }]
                }, {
                    model: models.Vendor,
                    attributes: ["name"]
                }]
            }).then(function(model) {
                res.json(model);
            })
            .catch(function(error) {
                res.send(error);
            });
    })
    .post('/', function(req, res) {
      //models.Invoice
    })

module.exports = router;
