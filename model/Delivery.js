const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Delivery = db.define('Delivery', {
    delivery_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    request_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    NOMART: {
        type: DataTypes.STRING(120),
        allowNull: true
    },
    UNIDADMED: {
        type: DataTypes.STRING(16),
        allowNull: true
    },
    CANT: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    USRREG: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FECREG: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'deliveries',
    timestamps: false
});

module.exports = Delivery;
