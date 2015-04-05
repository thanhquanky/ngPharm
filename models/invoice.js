var Sequelize = require('sequelize');

module.exports = {
    Invoice: function(sequelizeInstance) {
        return sequelizeInstance.define('invoice', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            number: {
                type: Sequelize.STRING,
            },
            order_date: {
                type: Sequelize.DATE
            },
            vendor_id: {
                type: Sequelize.INTEGER
            }
        }, {
            freezeTableName: true // Model tableName will be the same as the model name
        });
    }
};
