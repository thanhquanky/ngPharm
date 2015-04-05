var Sequelize = require('sequelize');

module.exports = {
    InvoiceItem: function(sequelizeInstance) {
        return sequelizeInstance.define('invoice_item', {
            invoice_id: {
                type: Sequelize.INTEGER,
                unique: 'compositeIndex'
            },
            drug_id: {
                type: Sequelize.INTEGER,
                unique: 'compositeIndex'
            },
            unit_id: {
                type: Sequelize.INTEGER,
                unique: 'compositeIndex'
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            manufacture_date: {
                type: Sequelize.DATE
            },
            expiration_date: {
                type: Sequelize.DATE
            },
            price: {
                type: Sequelize.FLOAT
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
    }
};
