var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
//
function findOne(id) {
    return models.Invoice.findOne({
        attributes: ["id", "number", "createdAt", "updatedAt"],
        where: {
            id: id
        },
        include: [
            {model: models.InvoiceItem,
                attributes: ["id", "sku", "quantity", "manufactureDate", "expirationDate", "price"],
                include: [{
                    model: models.Drug,
                    attributes: ["name"]
                }, {
                    model: models.Unit,
                    attributes: ["name"]
                }]
            }, {
                model: models.Vendor,
                attributes: ["id", "name"]
        }]
    })
}

function findAll() {
    return models.Invoice.findAll({
        attributes: ['id','number'],
        include: {
            model: models.Vendor,
            attributes: ["name"]
        }
    })
}
router
    .get('/', function(req, res) {
        findAll()
            .then(sendJSON(res))
            .catch(function(error) {
                res.send(error);
            });
    })
    .get('/:invoiceId', function(req, res) {
        findOne(req.params.invoiceId)
            .then(function(model) {
                if (model !== null)
                    res.json(model);
                else {
                    res.sendStatus(404);
                }
            })
            .catch(function(error) {
                res.send(404, error);
            });
    })
    .post('/', function(req, res) {
        var items = [];
        var tInvoice = req.body;
        tInvoice.vendor = req.body.Vendor.id;
        models.Invoice.create(tInvoice)
            .then(function(invoice) {
                tInvoice.InvoiceItems.forEach(function(item) {
                    var t = {
                        quantity: item.quantity,
                        price: item.price,
                        invoice: invoice.id,
                        drug: item.Drug.id,
                        unit: item.Unit.id,
                        sku: item.sku,
                        manufactureDate: item.manufactureDate,
                        expirationDate: item.expirationDate
                    };
                    items.push(t);
                });
                console.log(items);
                models.InvoiceItem.bulkCreate(items)
                    .then(function() {
                        findOne(invoice.id)
                            .then(function(model) {
                                res.json(model);
                            })
                            .catch(function(error) {
                                res.send(error);
                            });
                    })
                    .catch(function(error) {
                        res.send(error);
                    });
            })
            .catch(function(error) {
                res.send(error);
            });
    });

module.exports = router;
