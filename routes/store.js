const { Router } = require('express');
const { db } = require('../database/config');

const router = Router();

// Obtener artículos de la tabla store filtrados por store_id y NOMART
router.get('/', async (req, res) => {
    const { store_id, NOMART } = req.query;

    let sql = 'SELECT store_id, NOMART, CANTSTOCK, UNIDADMED FROM store WHERE 1=1';
    const params = [];

    if (store_id) {
        sql += ' AND store_id = ?';
        params.push(store_id);
    }
    
    if (NOMART) {
        sql += ' AND NOMART = ?';
        params.push(NOMART);
    }

    try {
        const [results] = await db.query(sql, { replacements: params });
        res.json(results);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
});

module.exports = router;