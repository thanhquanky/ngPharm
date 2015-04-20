var Sequelize = require('sequelize');

module.exports = function(sequelizeInstance, DataTypes) {
    var Drug = sequelizeInstance.define('Drug', {
        "id": {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        "name": {
            type: DataTypes.STRING,
        },
        "use": {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        "manufacturer": {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return Drug;
}
