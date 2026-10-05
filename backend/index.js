const pool = require('./db');

pool.query('SELECT * FROM rets_openhouse WHERE L_ListingID = 1190952876',
function(err, results, fields) {
    if(err) throw err;
    console.log(results);
});