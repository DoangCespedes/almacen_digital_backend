const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const Building = require('./Building');

const Company = db.define('Company', {
    company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    building_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Building,
            key: 'building_id',
        },
    },
    CODCOMP: {
        type: DataTypes.STRING(3),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El código de la compañía es obligatorio',
            },
        },
    },
    RIFCOMP: {
        type: DataTypes.STRING(16),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El RIF de la compañía es obligatorio',
            },
        },
    },
    NOMCOMP: {
        type: DataTypes.STRING(400),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre de la compañía es obligatorio',
            },
        },
    },
    STSCOMP: {
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
    tableName: 'companies', // Nombre de la tabla en la base de datos
    timestamps: false, // Si no necesitas `createdAt` y `updatedAt`
});

module.exports = Company;