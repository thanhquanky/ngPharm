var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    models.Invoice.findAll({
            include: {
                model: models.InvoiceItem,
                include: [models.Drug, models.Unit]
            }
        })
        .then(function(models) {
            res.json(models);
        })
        .catch(function(error) {
            res.send(error);
        });
})

module.exports = router;
