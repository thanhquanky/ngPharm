
var Sequelize = require('sequelize');
module.exports = function(sequelizeInstance, DataTypes){
    var Currency = sequelizeInstance.define('Currency',{
        "id": {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        "code": {
            type: DataTypes.STRING,
            unique: true
        },
        "name": {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        freezeTableName: true
    });
    return Currency;
}

