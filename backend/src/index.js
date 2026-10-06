import express from 'express';
import pool from './db/db.js';
import cors from 'cors';
import propertiesRouter from './routes/properties.js';


const port = process.env.PORT || 5000; 
const app = express(); 
app.use(express.json());
app.use(cors());

//Mounting the properties route at /api/properties
app.use('/api/properties', propertiesRouter);


//Example to check if it's working
/*pool.query('SELECT * FROM rets_openhouse WHERE L_ListingID = 1190952876',
function(err, results, fields) {
    if(err) throw err;
    console.log(results);
});*/


app.listen(port, () => {
    console.log(`API listening at http: localhost:${port}`);
});

app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.status(200).json({
            status: "ok",
            database: "connected",
        })
    } catch (error) {
        console.error("Caught an ERROR: " + error.message);
        res.status(500).json({
            status: "error",
            database: "disconnected",
        })
    }
});

