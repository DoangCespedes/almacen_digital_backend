// Request.js
const { DataTypes } = require('sequelize');
const { db } = require('../database/config'); // Asegúrate de importar correctamente tu conexión

const Request = db.define('Request', {
    request_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    STSSOL: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'NOTIFIED', 'PROCESSED', 'DELIVERED', 'RECEIVED'),
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
    },
}, {
    tableName: 'requests',
    timestamps: false, // Cambia a true si necesitas campos createdAt / updatedAt
});

// Definir relaciones con las tablas correspondientes
Request.associate = (models) => {
    Request.belongsTo(models.Empleado, {
        foreignKey: 'employee_id',
        onDelete: 'CASCADE',
    });
    Request.belongsTo(models.Department, {
        foreignKey: 'department_id',
        onDelete: 'CASCADE',
    });
    Request.belongsTo(models.Company, {
        foreignKey: 'company_id',
        onDelete: 'CASCADE',
    });
    Request.belongsTo(models.Building, {
        foreignKey: 'building_id',
        onDelete: 'CASCADE',
    });
};

module.exports = Request;