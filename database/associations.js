const Building = require('./Building');
const Company = require('./Company');
const Department = require('./Department');
const Empleado = require('./Empleado');
const Request = require('./Request');

const associateModels = () => {
    // Relaciones de Building
    Building.hasMany(Company, { foreignKey: 'building_id', onDelete: 'CASCADE' });
    Company.belongsTo(Building, { foreignKey: 'building_id' });

    // Relaciones de Company
    Company.hasMany(Department, { foreignKey: 'company_id', onDelete: 'CASCADE' });
    Department.belongsTo(Company, { foreignKey: 'company_id' });

    // Relaciones de Department
    Department.hasMany(Empleado, { foreignKey: 'department_id', onDelete: 'CASCADE' });
    Empleado.belongsTo(Department, { foreignKey: 'department_id' });

    // Relaciones de Company y Department
    Department.hasMany(Request, { foreignKey: 'department_id', onDelete: 'CASCADE' });
    Request.belongsTo(Department, { foreignKey: 'department_id' });

    // Relaciones de Empleado
    Empleado.belongsTo(Company, { foreignKey: 'company_id', onDelete: 'CASCADE' });
    Empleado.belongsTo(Building, { foreignKey: 'building_id', onDelete: 'CASCADE' });
    Empleado.hasMany(Request, { foreignKey: 'employee_id', onDelete: 'CASCADE' });

    // Relaciones de Request
    Request.belongsTo(Empleado, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
    Request.belongsTo(Company, { foreignKey: 'company_id', onDelete: 'CASCADE' });
    Request.belongsTo(Building, { foreignKey: 'building_id', onDelete: 'CASCADE' });

};

module.exports = associateModels;
