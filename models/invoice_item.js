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
        },
        "sku": {
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function(models) {
                InvoiceItem.belongsTo(models.Drug, {foreignKey: 'drug'});
                InvoiceItem.belongsTo(models.Unit, {foreignKey: 'unit'});
                InvoiceItem.belongsTo(models.Invoice, {foreignKey: 'invoice'})
                /*
                */
            }
        },
        freezeTableName: true // Model tableName will be the same as the model name
    });
    return InvoiceItem;
};
