var Sequelize = require('sequelize');

module.exports = function(sequelizeInstance, DataTypes) {
    var Vendor = sequelizeInstance.define('Vendor', {
        "id": {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        "name": {
            type: DataTypes.STRING
        },
        // "email": {
        //     type: DataTypes.STRING
        // },
        "address": {
            type: DataTypes.STRING
        },
        "telephone": {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });
    return Vendor;
}
