import express from 'express';
import pool from './db/db.js';
import cors from 'cors';
import morgan from 'morgan';
import propertiesRouter from './routes/properties.js';


const port = process.env.PORT || 5000; 
const app = express(); 

app.use(express.json());
app.use(cors());
    //Request logging middleware (method, URL, status code, duration in ms)
app.use(morgan('[:date[clf]] :method :url :status - :response-time ms'));
    //Mounting the properties route at /api/properties
app.use('/api/properties', propertiesRouter);



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
