var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
var sendServerError = middlewares.sendServerErrorFunction;
var sendNotFoundError = middlewares.sendNotFoundErrorFunction;
//
function findOne(id) {
    return models.Invoice.findOne(
        {
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
                }
            ]
        }
    )
};

router
    .get('/', middlewares.findAllFunction(
                models.Invoice, 
                {
                    attributes: ['id','number'],
                    include: {  model: models.Vendor,    attributes: ["name"] }            
                }
            )
        )
    .get('/:invoiceId', function(req, res) {
        findOne(req.params.invoiceId)
            .then(function(model) {
                if (model !== null)
                    res.json(model);
                else {
                    res.sendStatus(404);
                }
            })
            .catch(sendServerError(res));
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
    })
    .delete('/:id', middlewares.destroyByIdFunction(models.Invoice));;

module.exports = router;
