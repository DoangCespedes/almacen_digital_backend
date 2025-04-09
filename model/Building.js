const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Building = db.define('Building', {
    building_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    CODTORRE: {
        type: DataTypes.STRING(3),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El código de la torre es obligatorio',
            },
        },
    },
    NOMTORRE: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre de la torre es obligatorio',
            },
        },
    },
    TORDIRECCION: {
        type: DataTypes.STRING(400),
    },
    STSTORR: {
        type: DataTypes.ENUM('ENABLED', 'DISABLED'),
        allowNull: false,
    },
    USRREG: {
        type: DataTypes.STRING(50),
    },
    FECREG: {
        type: DataTypes.DATE,
    },
    USRMOD: {
        type: DataTypes.STRING(50),
    },
    FECMOD: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'buildings', // Nombre de la tabla en la base de datos
    timestamps: false, // Si no necesitas `createdAt` y `updatedAt`
});

module.exports = Building;