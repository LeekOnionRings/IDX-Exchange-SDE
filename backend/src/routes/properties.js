import express from 'express';
import pool from '../db/db.js'
import cors from 'cors';


const propertiesRouter = express.Router();

propertiesRouter.get('/', async (req, res) => {

    try {
        
        //Pagination (limit and offset query params)
        const limit = Math.max(parseInt(req.query.limit, 10) || 20, 1);
        const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);
        const page = Math.floor(offset/limit) + 1;

        const [properties] = await pool.query(
            `SELECT * 
            FROM rets_property 
            ORDER BY id
            LIMIT ? OFFSET ?;`, 
            [limit, offset]
        );

        //Returns total count - needs to be adjusted so it only returns total for current search
        const [total] = await pool.query(
            `SELECT COUNT(*) AS total FROM rets_property`
        )

        //Displays data
        res.json({  
            pagination: {
                total,
                limit,
                offset,
            },
            data: properties,
        })


    } catch (error) {

        console.error(error);
        res.status(500).json({error: "Database query failed"});

    }

    
});

export default propertiesRouter;