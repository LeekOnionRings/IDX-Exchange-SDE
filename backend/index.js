import express from 'express';
import pool from './db.js';
import cors from 'cors';
//const pool = require('./db');


const port = process.env.PORT || 5000; 
const app = express(); //API
app.use(express.json());
app.use(cors());


//Example to check if it's working
/*pool.query('SELECT * FROM rets_openhouse WHERE L_ListingID = 1190952876',
function(err, results, fields) {
    if(err) throw err;
    console.log(results);
});*/


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

app.listen(port, () => {
    console.log(`API listening at http: localhost:${port}`);
});
