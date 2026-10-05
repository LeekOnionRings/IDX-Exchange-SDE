import express from 'express';
import pool from './db.js';
//const pool = require('./db');


//Variables
const port = process.env.PORT || 3000;
const app = express(); //API
app.use(express.json());


//Example to check if it's working
/*pool.query('SELECT * FROM rets_openhouse WHERE L_ListingID = 1190952876',
function(err, results, fields) {
    if(err) throw err;
    console.log(results);
});*/


app.get('/', (req, res) => {
    res.json({message: 'ok'});
});

app.listen(port, () => {
    console.log('API listening at http: localhost:${port}');
});
