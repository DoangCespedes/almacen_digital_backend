// routes/request.js
const express = require('express');
const Request = require('../model/Request');
const Order = require('../model/Order');
const { db } = require('../database/config'); 
const router = express.Router();

// Endpoint para insertar solicitudes
router.post('/', async (req, res) => {
    const { employee_id, building_id, company_id, department_id, STSSOL, USRREG, FECREG } = req.body;

    try {
        const newRequest = await Request.create({
            employee_id,
            building_id,
            company_id,
            department_id,
            STSSOL,
            USRREG,
            FECREG
        });

        res.status(201).json({ request_id: newRequest.request_id });
    } catch (error) {
        console.error('Error al insertar la solicitud:', error);
        res.status(500).json({ error: 'Error al insertar la solicitud' });
    }
});

// Endpoint para insertar órdenes
router.post('/orders', async (req, res) => {
    const orders = req.body; // Suponemos que orders es un array de órdenes

    if (!Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({ error: 'Se requiere un arreglo de órdenes' });
    }

    try {
        const createdOrders = await Order.bulkCreate(orders);
        res.status(201).json({ message: 'Órdenes insertadas correctamente', orders: createdOrders });
    } catch (error) {
        console.error('Error al insertar las órdenes:', error);
        res.status(500).json({ error: 'Error al insertar las órdenes' });
    }
});

// Endpoint para obtener solicitudes por estado
router.post('/get_requests', async (req, res) => {
    const { status } = req.body; // Obtiene el estado desde el cuerpo de la solicitud

    // Verifica que se haya proporcionado un estado
    if (!status) {
        return res.status(400).json({ error: 'Se requiere un estado para filtrar las solicitudes.' });
    }

    try {
        // Busca solicitudes que coincidan con el estado
        const requests = await Request.findAll({
            where: {
                STSSOL: status // Filtra por estado
            }
        });

        // Si no se encuentran solicitudes, devuelve un mensaje adecuado
        if (requests.length === 0) {
            return res.status(404).json({ message: 'No se encontraron solicitudes con el estado especificado.' });
        }

        // Devuelve las solicitudes encontradas
        res.json(requests);
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        res.status(500).json({ error: 'Error al obtener las solicitudes.' });
    }
});

module.exports = router;