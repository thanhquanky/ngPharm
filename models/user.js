var Sequelize = require('sequelize');
module.exports = function(sequelizeInstance, DataTypes){
    var User = sequelizeInstance.define('User', {
        "username": {
            type: DataTypes.STRING,
            primaryKey: true
        }, 
        "password": {
            type: DataTypes.STRING
        }, 
        "first_name": {
            type: DataTypes.STRING
        }, 
        "last_name": {
            type: DataTypes.STRING
        }, 
        "gender" : {
            type: DataTypes.ENUM('O', 'M', 'F')
        }, 
        "birth_date": {
            type: DataTypes.DATE
        }, 
        "address": {
            type: DataTypes.STRING
        }, 
        "phone_number": {
            type: DataTypes.STRING
        }, 
        "is_staff": {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    }, {
        freezeTableName: true //Model tableName will be the same as the model name
    });
    return User;
}


//

