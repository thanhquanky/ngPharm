var Sequelize = require('sequelize');

module.exports = {
    Vendor: function(sequelizeInstance) {
        return sequelizeInstance.define('vendor', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            telephone: {
                type: Sequelize.STRING
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
    }
};
