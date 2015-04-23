var Sequelize = require('sequelize');
module.exports = function(sequelizeInstance, DataTypes){
    var ItemPrice = sequelizeInstance.define('ItemPrice', {
        "id": {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        "price": {
            type: DataTypes.FLOAT
        }
    }, {
        classMethods: {
            associate: function(models) {
                ItemPrice.belongsTo(models.Drug, {foreignKey: 'drug'});
                ItemPrice.belongsTo(models.Unit, {foreignKey: 'unit'});
                ItemPrice.belongsTo(models.Currency, {foreignKey: 'currency'});
                /*
                */
            }
        },
        freezeTableName: true
    });
    return ItemPrice;
}