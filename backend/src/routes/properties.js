import express from 'express';
import pool from '../db/db.js'


const propertiesRouter = express.Router();


//GET api/properties/:id/openhouses returns an array of the open house events for a property
    //(and open houses are ordered by date and time)
propertiesRouter.get('/:id/openhouses', async (req, res) => {

    try {

        const thisID = req.params.id;
            //Returns 400 if ID is malformed or oversized
        if(isNaN(thisID)) { return res.status(400).json({ error: "These IDs must only have numbers." })}
        if(thisID.length > 50) { return res.status(400).json({ error: "This ID is too big." })}

            //Returns 404 with a helpful message for unknown IDs
        const [propertyObj] = await pool.query(
            `SELECT L_ListingID FROM rets_property WHERE L_ListingID = ?`, [thisID]
        );
        
        if(propertyObj.length === 0) { return res.status(404).json({ error: "Unknown L_ListingID. Unable to find a property's openhouse." }); } 

        const [openhousesArray] = await pool.query(
            `SELECT * FROM rets_openhouse 
            WHERE L_ListingID = ? 
            ORDER BY OpenHouseDate, OH_StartTime`, [thisID]
        ) 

        res.json(openhousesArray);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Oh no! There was a problem! Could not retrieve openhouses."});
    }

});


//GET /api/properties/:id returns the full property object or 404
propertiesRouter.get('/:id', async (req, res) => {
    
    try {

        const ID = req.params.id;

        //[Testing] Valid ID: 1118422731; Length: 55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555; Malformed: xyz321
            //Returns 400 if ID is malformed or oversized
        if(isNaN(ID)) { return res.status(400).json({ error: "IDs must only have numbers." })}
        if(ID.length > 50) { return res.status(400).json({ error: "ID is too big." })}
        
        const [propertyObject] = await pool.query(
            `SELECT * FROM rets_property WHERE L_ListingID = ?`, [ID]
        );

            //Returns 404 with a helpful message for unknown IDs
        if(propertyObject.length === 0) { return res.status(404).json({ error: "Unknown ID. Unable to find a property." }); } 

        res.json(
            propertyObject[0]
        )
        
    } catch (error) {
        res.status(500).json({error: "Oh no! There was a problem retrieving the properties!" + error});
        console.error(error);
    }

});


propertiesRouter.get('/', async (req, res) => {

    try {
        
        //Pagination (limit and offset query params)
        const limit = Math.max(parseInt(req.query.limit, 10) || 20, 1);
        if(req.query.limit) {
            if(isNaN(req.query.limit) || req.query.limit < 1 || req.query.limit > 199) { 
                return res.status(400).json({ error: "limit is outside the valid range (1-199)" })
            }
        }
        const offset = Math.max(parseInt(req.query.offset, 10) || 0, 0);
        if(req.query.offset) {
            if(isNaN(req.query.offset) || req.query.offset < 0) { 
                return res.status(400).json({ error: "offset must be a positive number" })
            }
        }
        
        //Filtering
        const filter = [];
        const params = [];

        if(req.query.city) {
            filter.push('LOWER(TRIM(L_City)) = LOWER(TRIM(?))');
            params.push(req.query.city.trim());
        }

        if(req.query.zipcode) {
            if(isNaN(req.query.zipcode) || req.query.zipcode < 0) {
                return res.status(400).json({ error: "zipcode must be a positive number" })
            } else {
                filter.push('L_Zip = ?');
                params.push(req.query.zipcode);
            }
        }

        if(req.query.minPrice) {
            if(isNaN(req.query.minPrice) || req.query.minPrice < 0) {
                return res.status(400).json({ error: "minPrice must be a positive number" })
            } else {
                filter.push('L_SystemPrice >= ?');
                params.push(Number(req.query.minPrice));
            }
        }

        if(req.query.maxPrice) {
            if(isNaN(req.query.maxPrice) || req.query.maxPrice < 0) {
                return res.status(400).json({ error: "maxPrice must be a positive number" })
            } else {
                filter.push('L_SystemPrice <= ?');
                params.push(Number(req.query.maxPrice));
            }
            
        }

        if(req.query.beds) {
            if(isNaN(req.query.beds) || req.query.beds < 0) {
                return res.status(400).json({ error: "beds must be a positive number" }) 
            } else {
                filter.push('L_Keyword2 = ?');
                params.push(req.query.beds);
            }
        }

        if(req.query.baths) {
            if(isNaN(req.query.baths) || req.query.baths < 0) {
                return res.status(400).json({ error: "baths must be a positive number" }) 
            } else {
                filter.push('LM_Dec_3 = ?');
                params.push(req.query.baths);
            }   
        }

        let where = '';
        if(filter.length > 0) {
            where = 'WHERE ' + filter.join(' AND ');
        } else {
            where = '';
        }


        //Query performance before adding indexes (EXPLAIN)
        let [showIndexBefore] = await pool.query(
            `EXPLAIN ANALYZE
            SELECT * FROM rets_property ${where}
            ORDER BY id
            LIMIT ? OFFSET ?;`, 
            [...params, limit, offset]
        )


        //Returns total count
        let [total] = await pool.query(
            `SELECT COUNT(*) AS total FROM rets_property ${where}`, [...params]
        )
        total = total[0].total;

        //Retrieves final data
        const [results] = await pool.query(
            `SELECT * 
            FROM rets_property ${where}
            ORDER BY id
            LIMIT ? OFFSET ?;`, 
            [...params, limit, offset]
        );


        //Created database indexes within MySQL Workbench


        //Query performance after adding indexes (EXPLAIN)
        let [showIndexAfter] = await pool.query(
            `EXPLAIN ANALYZE
            SELECT * 
            FROM rets_property ${where}
            ORDER BY id
            LIMIT ? OFFSET ?;`, 
            [...params, limit, offset]
        )


        //Displays final data
        res.json({  
            total,
            limit,
            offset,
            results,
            //showIndexBefore,
            //showIndexAfter
        });
        

    } catch (error) {

        console.error(error);
        res.status(500).json({error: "Database query failed"});

    }
    
});


export default propertiesRouter;
