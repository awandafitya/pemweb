const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Buat koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comprouts'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL Connected...');
});

// Import routes
const beritaRoutes = require('./routes/routes');

// Use routes
app.use('/berita', beritaRoutes);

// Define a route for the root URL
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM berita';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
