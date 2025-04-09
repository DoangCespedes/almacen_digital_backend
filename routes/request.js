// routes/request.js
const express = require('express');
const Request = require('../model/Request');
const Order = require('../model/Order');
const { db } = require('../database/config'); 
const { Op, Sequelize } = require('sequelize');
const Delivery = require('../model/Delivery');
const Store = require('../model/Store'); 
const router = express.Router();

// Endpoint para insertar solicitudes
router.post('/', async (req, res) => {
    const { 
        employee_id, 
        building_id, 
        company_id, 
        department_id, 
        STSSOL, 
        USRREG, 
        FECREG, 
        NOMEMP,      // Nuevo campo
        CORREO,      // Nuevo campo
        NOMDPTO,     // Nuevo campo
        NOMCOMP,     // Nuevo campo
        NOMTORRE     // Nuevo campo
    } = req.body;

    try {
        const newRequest = await Request.create({
            employee_id,
            building_id,
            company_id,
            department_id,
            STSSOL,
            USRREG,
            FECREG,
            NOMEMP,      // Asignación del nuevo campo
            CORREO,      // Asignación del nuevo campo
            NOMDPTO,     // Asignación del nuevo campo
            NOMCOMP,     // Asignación del nuevo campo
            NOMTORRE     // Asignación del nuevo campo
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
    const { status, solicitante, fecha, empresa } = req.body;
    const whereConditions = {};

    if (status) {
        whereConditions.STSSOL = status;
    }
    if (solicitante && solicitante.trim() !== '') {
        whereConditions.NOMEMP = { [Op.like]: `%${solicitante}%` };
    }
    if (fecha && fecha.trim() !== '') {
        whereConditions[Op.and] = Sequelize.literal(`DATE(FECREG) = '${fecha}'`);
    }
    if (empresa && empresa.trim() !== '') {
        whereConditions.NOMCOMP = empresa;
    }

    if (Object.keys(whereConditions).length === 0) {
        return res.status(400).json({ error: 'Se requiere al menos un parámetro de filtro.' });
    }

    try {
        const requests = await Request.findAll({ where: whereConditions });
        if (requests.length === 0) {
            return res.status(404).json({ message: 'No se encontraron solicitudes.' });
        }
        res.json(requests);
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        res.status(500).json({ error: 'Error al obtener las solicitudes.' });
    }
});


router.post('/get_requests_by_employee', async (req, res) => {
    const { employee_id } = req.body; // Obtiene el employee_id desde el cuerpo de la solicitud

    // Verifica que se haya proporcionado un employee_id
    if (!employee_id) {
        return res.status(400).json({ error: 'Se requiere un employee_id para filtrar las solicitudes.' });
    }

    try {
        // Busca solicitudes que coincidan con el employee_id
        const requests = await Request.findAll({
            where: {
                employee_id: employee_id // Filtra por employee_id
            }
        });

        // Si no se encuentran solicitudes, devuelve un mensaje adecuado
        if (requests.length === 0) {
            return res.status(404).json({ message: 'No se encontraron solicitudes para el employee_id especificado.' });
        }

        // Devuelve las solicitudes encontradas
        res.json(requests);
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        res.status(500).json({ error: 'Error al obtener las solicitudes.' });
    }
});

router.post('/get_orders', async (req, res) => {
    const { request_id } = req.body; // Obtiene el request_id desde el cuerpo de la solicitud

    // Verifica que se haya proporcionado un request_id
    if (typeof request_id !== 'number' || request_id <= 0) {
        return res.status(400).json({ error: 'Se requiere un request_id válido para filtrar las órdenes.' });
    }

    try {
        // Busca órdenes que coincidan con el request_id
        const orders = await Order.findAll({
            where: {
                request_id: request_id // Filtra por request_id
            }
        });

        // Si no se encuentran órdenes, devuelve un mensaje adecuado
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No se encontraron órdenes para el request_id especificado.' });
        }

        // Devuelve las órdenes encontradas
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        res.status(500).json({ error: 'Se produjo un error al obtener las órdenes. Inténtalo de nuevo más tarde.' });
    }
});




// POST /deliveries
router.post('/deliveries', async (req, res) => {
    const deliveries = req.body;

    if (!Array.isArray(deliveries) || deliveries.length === 0) {
        return res.status(400).json({ error: 'Se requiere un arreglo de entregas' });
    }

    const validDeliveries = deliveries.filter(delivery =>
        delivery.request_id &&
        delivery.order_id &&
        delivery.store_id &&
        delivery.NOMART &&
        delivery.UNIDADMED &&
        delivery.CANT
    );

    if (validDeliveries.length === 0) {
        return res.status(400).json({ error: 'Ninguna entrega válida encontrada' });
    }

    // Agregar FECREG actual a cada entrega
    const deliveriesWithDate = validDeliveries.map(delivery => ({
        ...delivery,
        FECREG: new Date()
    }));

    try {
        // Crear las entregas
        const createdDeliveries = await Delivery.bulkCreate(deliveriesWithDate);

        // Actualizar el estado de la solicitud relacionada
        const requestIds = new Set(deliveriesWithDate.map(delivery => delivery.request_id));
        
        // Actualizar inventario en la tabla store
        for (const delivery of deliveriesWithDate) {
            const store = await Store.findOne({ where: { store_id: delivery.store_id } });
            if (store) {
                // Restar la cantidad de artículos
                store.CANTSTOCK -= delivery.CANT;
                store.USRMOD = delivery.USRREG || 'default_user'; // Registrar usuario que modifica
                store.FECMOD = new Date(); // Fecha de modificación
                await store.save(); // Guardar los cambios
            }
        }

        for (const request_id of requestIds) {
            const new_status = 'DELIVERED'; // Establecer el nuevo estado que deseas
            const user_name = deliveriesWithDate[0].USRREG || 'default_user'; // Obtener el nombre del usuario que registró

            // Actualizar el estado de la solicitud
            const requestUpdateResponse = await Request.findByPk(request_id);
            if (requestUpdateResponse) {
                requestUpdateResponse.STSSOL = new_status;
                requestUpdateResponse.USRMOD = user_name;
                requestUpdateResponse.FECMOD = new Date();
                await requestUpdateResponse.save();
            }
        }

        res.status(201).json({
            message: 'Entregas creadas exitosamente',
            deliveries: createdDeliveries
        });
    } catch (error) {
        console.error('Error al crear entregas:', error);
        res.status(500).json({ error: 'Error al crear entregas', message: error.message });
    }
});





module.exports = router;