var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelizeInstance, DataTypes){
var newPass = "";
    var User = sequelizeInstance.define('User', {
        "username": {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            required: true
        }, 
        "password": {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
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
        instanceMethods: {
            comparePassword: function(password){
                var user = this;
                return bcrypt.compareSync(password, user.password);
            }
        },
        freezeTableName: true //Model tableName will be the same as the model name
    });
    User.beforeCreate(function(user){
        user.password = bcrypt.hashSync(user.password);
    });
    return User;
}


//

