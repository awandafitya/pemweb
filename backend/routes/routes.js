const express = require('express');
const router = express.Router();
const mysql = require('mysql');

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

// Tambah Berita
router.post('/add', (req, res) => {
    const newBerita = {
        title: req.body.title,
        category: req.body.category,
        summary: req.body.summary,
        keywords: req.body.keywords
    };
    const sql = 'INSERT INTO berita SET ?';
    db.query(sql, newBerita, (err, result) => {
        if (err) {
            console.error('Error adding berita:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Berita added successfully', id: result.insertId });
    });
});

// Dapatkan Semua Berita
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM berita';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching berita:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});

// Update Berita
router.put('/update/:id', (req, res) => {
    const updatedBerita = {
        title: req.body.title,
        category: req.body.category,
        summary: req.body.summary,
        keywords: req.body.keywords
    };
    const sql = 'UPDATE berita SET ? WHERE id = ?';
    db.query(sql, [updatedBerita, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating berita:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Berita not found' });
        }
        res.status(200).json({ message: 'Berita updated successfully' });
    });
});

// Hapus Berita
router.delete('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM berita WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting berita:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Berita not found' });
        }
        res.status(200).json({ message: 'Berita deleted successfully' });
    });
});

module.exports = router;
