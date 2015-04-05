var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    models.Invoice.findAll({
            include: [{
                model: models.InvoiceItem,
                attributes: ["id", "quantity", "manufactureDate", "expirationDate", "price"],
                include: [
                    {
                        model: models.Drug,
                        attributes: ["name"]
                    },
                    {
                        model: models.Unit,
                        attributes: ["name"]
                    }
                ]
            },
            {
                model: models.Vendor,
                attributes: ["name"]
            }]
        })
        .then(function(models) {
            res.json(models);
        })
        .catch(function(error) {
            res.send(error);
        });
})

module.exports = router;
