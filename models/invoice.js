var Sequelize = require('sequelize');
module.exports = function(sequelizeInstance) {
    var Invoice = sequelizeInstance.define('Invoice', {
        "id": {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        "number": {
            type: Sequelize.STRING,
        },
        "orderDate": {
            type: Sequelize.DATE
        }
    }, {
        classMethods: {
            associate: function(models) {
                Invoice.belongsTo(models.Vendor, {foreignKey: 'vendor'});
            }
        },
        freezeTableName: true // Model tableName will be the same as the model name
    });
    return Invoice;
};
