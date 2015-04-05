var Sequelize = require('sequelize');

module.exports = {
    Drug: function(sequelizeInstance) {
        return sequelizeInstance.define('drug', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
            },
            use: {
                type: Sequelize.STRING,
                allowNull: true
            },
            side_effect: {
                type: Sequelize.STRING,
                allowNull: true
            },
            warning: {
                type: Sequelize.STRING,
                allowNull: true
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
    }
};
