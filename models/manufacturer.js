var Sequelize = require('sequelize');
module.exports = function(sequelizeInstance, DataTypes){
    var Manufacturer = sequelizeInstance.define('Manufacturer', {
        "id": {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        "name": {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });
    return Manufacturer;
}