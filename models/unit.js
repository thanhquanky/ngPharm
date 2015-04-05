var Sequelize = require('sequelize');

module.exports = {
    Unit: function(sequelizeInstance) {
        return sequelizeInstance.define('unit', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
    }
};
