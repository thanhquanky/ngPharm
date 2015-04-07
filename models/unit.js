var Sequelize = require('sequelize');

module.exports = function(sequelizeInstance, DataTypes) {
    var Unit = sequelizeInstance.define('Unit', {
        "id": {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        "name": {
            type: DataTypes.STRING,
        }
    }, {
        classMethods: {
            associate: function(models) {
                Unit.hasMany(models.InvoiceItem);
            }
        },
        freezeTableName: true // Model tableName will be the same as the model name
    });
    return Unit;
}
