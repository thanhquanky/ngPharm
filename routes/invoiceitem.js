var models = require('../models');
var express = require('express');
var router = express.Router();
//
var middlewares = require('../middlewares');
var sendJSON = middlewares.sendJSONFunction;
var sendError = middlewares.sendErrorFunction;
//
router.get('/', middlewares.findAllFunction(models.InvoiceItem, {}));
router.get('/:name', 
    function(req, res) {
        models.InvoiceItem.findAll(
                {
                    include: [models.Drug, models.Unit],
                    where: [
                        "Drug.name LIKE ?", req.params.name + "%"
                    ]
                }
            )
            .then(sendJSON(res))
            .catch(sendError(res));
        }
    )
        .delete('/:id', middlewares.destroyByIdFunction(models.InvoiceItem));
module.exports = router;
