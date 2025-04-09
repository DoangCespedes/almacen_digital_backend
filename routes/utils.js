const express = require('express');
const Building = require('../model/Building');
const Company = require('../model/Company');
const Department = require('../model/Department');

const router = express.Router();

// API para obtener el edificio
router.post('/get_building', async (req, res) => {
    const { building_id } = req.body;
    try {
        const building = await Building.findOne({ where: { building_id } });
        if (building) {
            res.json(building);
        } else {
            res.status(404).json({ message: 'Edificio no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el edificio:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// API para obtener la compañía
router.post('/get_company', async (req, res) => {
    const { company_id } = req.body;
    try {
        const company = await Company.findOne({ where: { company_id } });
        if (company) {
            res.json(company);
        } else {
            res.status(404).json({ message: 'Compañía no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la compañía:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// API para obtener el departamento
router.post('/get_departament', async (req, res) => {
    const { department_id } = req.body;
    try {
        const department = await Department.findOne({ where: { department_id } });
        if (department) {
            res.json(department);
        } else {
            res.status(404).json({ message: 'Departamento no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el departamento:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;