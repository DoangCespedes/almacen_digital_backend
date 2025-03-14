const { DataTypes } = require('sequelize');
const { db } = require('../database/config'); // Asegúrate de importar tu conexión correctamente

const Order = db.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'requests',
            key: 'request_id'
        }
    },
    CODART: {
        type: DataTypes.STRING(50), // Ajusta según tu modelo
        allowNull: false,
    },
    CANT: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    STSORD: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED', 'CANCELED'), // Define los estados según tus necesidades
        allowNull: false,
    },
    USRREG: {
        type: DataTypes.STRING(16),
        allowNull: true,
    },
    FECREG: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'orders',
    timestamps: false,
});

module.exports = Order;