var Sequelize = require('sequelize');
module.exports = function(sequelizeInstance) {
    var Invoice = sequelizeInstance.define('Invoice', {
        "id": {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: 'compositeIndex'
        },
        "number": {
            type: Sequelize.STRING
        }}, {
        classMethods: {
            associate: function (models) {
                Invoice.belongsTo(models.Vendor, {
                    foreignKey: 'vendor',
                    unique: 'compositeIndex'
                });
                Invoice.hasMany(models.InvoiceItem, {foreignKey: 'invoice'});
            }
        },
        freezeTableName: true // Model tableName will be the same as the model name
    });
    return Invoice;
};
