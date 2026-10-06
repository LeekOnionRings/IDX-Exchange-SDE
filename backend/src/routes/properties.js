import express from 'express';
import pool from '../db/db.js'
import cors from 'cors';

const propertiesRouter = express.Router();

propertiesRouter.get('/', async (req, res) => {

    try {
        const [rows] = await pool.query(
            `SELECT * FROM rets_property LIMIT 2;`
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Database query failed"});
    }
    
});

export default propertiesRouter;