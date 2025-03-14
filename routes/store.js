const { Router } = require('express');
const { db } = require('../database/config'); // Asegúrate de que la configuración de la base de datos está correctamente exportada.

const router = Router();

// Obtener todos los artículos de la tabla store
router.get('/', async (req, res) => {
    const sql = 'SELECT store_id, CODART, NOMART, UNIDADMED FROM store';

    try {
        const [results] = await db.query(sql);
        res.json(results);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

module.exports = router;