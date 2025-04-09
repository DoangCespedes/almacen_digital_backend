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
            model: 'requests', // Asegúrate de que este nombre coincide con el nombre de tu tabla de referencia
            key: 'request_id'
        }
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    NOMART: {
        type: DataTypes.STRING(120), // Coincide con la definición de la tabla
        allowNull: true,
    },
    UNIDADMED: {
        type: DataTypes.STRING(16), // Coincide con la definición de la tabla
        allowNull: true,
    },
    CANT: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    STSORD: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'NOTIFIED', 'PROCESSED', 'DELIVERED', 'RECEIVED'), // Define los estados según tu tabla
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
    USRMOD: {
        type: DataTypes.STRING(16),
        allowNull: true,
    },
    FECMOD: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'orders',
    timestamps: false,
});

module.exports = Order;