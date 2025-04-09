const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Store = db.define('Store', {
    store_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    CLASIFICACION: {
        type: DataTypes.STRING(16),
    },
    CATEGART: {
        type: DataTypes.STRING(16),
    },
    UNIDADMED: {
        type: DataTypes.STRING(16),
    },
    NOMART: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre del artículo es obligatorio',
            },
        },
    },
    DESCRIPCION: {
        type: DataTypes.STRING(200),
    },
    ENTSTOCK: {
        type: DataTypes.STRING(6),
    },
    FECULTENT: {
        type: DataTypes.DATE,
    },
    CANTSTOCK: {
        type: DataTypes.INTEGER,
    },
    STOCKTMIN: {
        type: DataTypes.INTEGER,
    },
    STOCKTMAX: {
        type: DataTypes.INTEGER,
    },
    FECULTSAL: {
        type: DataTypes.DATE,
    },
    STSART: {
        type: DataTypes.ENUM('ENABLED', 'DISABLED'),
        allowNull: false,
    },
    provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'providers', // Nombre de la tabla referenciada
            key: 'provider_id', // Clave primaria de la tabla referenciada
        },
        onDelete: 'CASCADE', // Acción a realizar al eliminar el proveedor
    },
    USRREG: {
        type: DataTypes.STRING(50),
    },
    FECREG: {
        type: DataTypes.DATE,
    },
    request_id: {
        type: DataTypes.INTEGER,
    },
    USRMOD: {
        type: DataTypes.STRING(50),
    },
    FECMOD: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'store', // Nombre de la tabla en la base de datos
    timestamps: false, // Si no necesitas `createdAt` y `updatedAt`
});

module.exports = Store;