// Empleado.js
const { DataTypes } = require('sequelize');
const { db } = require('../database/config'); // Asegúrate de importar correctamente tu conexión

const Empleado = db.define('Empleado', {
    employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    building_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CEDEMP: {
        type: DataTypes.STRING(16),
        unique: true,
        allowNull: false,
    },
    NOMEMP: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    CORREO: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    TIPO: {
        type: DataTypes.STRING(1),
        allowNull: true,
    },
    STSEMP: {
        type: DataTypes.ENUM('ENABLED', 'DISABLED'),
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
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    FECMOD: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'employees',
    timestamps: false,
});

// Definir relaciones con las tablas correspondientes
Empleado.associate = (models) => {
    Empleado.belongsTo(models.Department, {
        foreignKey: 'department_id',
        onDelete: 'CASCADE',
    });
    Empleado.belongsTo(models.Company, {
        foreignKey: 'company_id',
        onDelete: 'CASCADE',
    });
    Empleado.belongsTo(models.Building, {
        foreignKey: 'building_id',
        onDelete: 'CASCADE',
    });
};

module.exports = Empleado;