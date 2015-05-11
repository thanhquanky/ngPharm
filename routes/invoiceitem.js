var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
    var name = req.params.name;
        models.InvoiceItem.findAll({
            include: [models.Drug, models.Unit],
            where: [
                "Drug.name LIKE ?", name + "%"
            ]
        })
        .then(function(models) {
            res.json(models);
        })
        .catch(function(error) {
            res.send(error);
        });
})

module.exports = router;
