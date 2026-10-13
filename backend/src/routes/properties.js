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

        //Filtering
        const filter = [];
        const params = [];

        if(req.query.city) {
            filter.push('LOWER(TRIM(L_City)) = LOWER(TRIM(?))');
            params.push(req.query.city.trim());
        }

        if(req.query.zipcode) {
            filter.push('L_Zip = ?');
            params.push(req.query.zipcode);
        }

        if(req.query.minPrice) {
            filter.push('L_SystemPrice >= ?');
            params.push(Number(req.query.minPrice));
        }

        if(req.query.maxPrice) {
            filter.push('L_SystemPrice <= ?');
            params.push(Number(req.query.maxPrice));
        }

        if(req.query.beds) {
            filter.push('L_Keyword2 = ?');
            params.push(req.query.beds);
        }

        if(req.query.baths) {
            filter.push('LM_Dec_3 = ?');
            params.push(req.query.baths);
        }

        let where = '';
        if(filter.length > 0) {
            where = 'WHERE ' + filter.join(' AND ');
        } else {
            where = '';
        }


        //Returns total count - needs to be adjusted so it only returns total for current search
        const [total] = await pool.query(
            `SELECT COUNT(*) AS total FROM rets_property`
        )


        const [results] = await pool.query(
            `SELECT * 
            FROM rets_property ${where}
            ORDER BY id
            LIMIT ? OFFSET ?;`, 
            [...params, limit, offset]
        );

        //Displays data
        res.json({  
            total,
            limit,
            offset,
            results,
        })

    } catch (error) {

        console.error(error);
        res.status(500).json({error: "Database query failed"});

    }
    
});


export default propertiesRouter;
