var Sequelize = require('sequelize');

module.exports = function(sequelizeInstance, DataTypes) {
    var InvoiceItem = sequelizeInstance.define('InvoiceItem', {
        "quantity": {
            type: DataTypes.INTEGER
        },
        "manufactureDate": {
            type: DataTypes.DATE
        },
        "expirationDate": {
            type: DataTypes.DATE
        },
        "price": {
            type: DataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: function(models) {
                InvoiceItem.belongsTo(models.Invoice, {foreignKey: 'invoiceNo'});
                InvoiceItem.belongsTo(models.Drug, {foreignKey: 'drug'});
                InvoiceItem.belongsTo(models.Unit, {foreignKey: 'unit'});
                /*
                */
            }
        },
        freezeTableName: true // Model tableName will be the same as the model name
    });
    return InvoiceItem;
};
