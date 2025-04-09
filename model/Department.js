const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const Company = require('./Company');

const Department = db.define('Department', {
    department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'company_id',
        },
    },
    CODDPTO: {
        type: DataTypes.STRING(3),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El código del departamento es obligatorio',
            },
        },
    },
    NOMDPTO: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre del departamento es obligatorio',
            },
        },
    },
    STSDPTO: {
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
    tableName: 'departments', // Nombre de la tabla en la base de datos
    timestamps: false, // Si no necesitas `createdAt` y `updatedAt`
});

module.exports = Department;