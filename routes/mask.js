const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const connectionOptions = {
    user: 'avnadmin',
    host: 'post-tropical-alexandre-12345.a.aivencloud.com',
    database: 'defaultdb',
    password: 'AVNS_OtvJABv3Vzkb1MxEwDS',
    port: 17703,
    ssl: {
        rejectUnauthorized: false
    }
};

const pool = new Pool(connectionOptions);

// POST
router.post('/', async (req, res) => {
    const { name, description, mask_json } = req.body;
    try {
        const insertQuery = `INSERT INTO ws_masks (name, description, mask_json) VALUES ($1, $2, $3) RETURNING *;`;
        const result = await pool.query(insertQuery, [name, description, mask_json]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error occurred');
    }
});

// GET
router.get('/', async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM ws_masks;';
        const result = await pool.query(selectQuery);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error occurred');
    }
});

// GET: Retrieve a single mask by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const selectQuery = 'SELECT * FROM ws_masks WHERE id = $1;';
        const result = await pool.query(selectQuery, [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).send('Mask not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error occurred');
    }
});

// PUT
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, mask_json } = req.body;
    try {
        const updateQuery = `UPDATE ws_masks SET name = $1, description = $2, mask_json = $3 WHERE id = $4 RETURNING *;`;
        const result = await pool.query(updateQuery, [name, description, mask_json, id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).send('Mask not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error occurred');
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteQuery = 'DELETE FROM ws_masks WHERE id = $1 RETURNING *;';
        const result = await pool.query(deleteQuery, [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).send('Mask not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error occurred');
    }
});

module.exports = router;
