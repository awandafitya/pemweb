import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsList = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000')
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the news!', error);
            });
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Judul</th>
                        <th>Kategori</th>
                        <th>Ringkasan</th>
                        <th>Keywords</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((item, index) => (
                        <tr key={index}>
                            <td>{item.judul_berita}</td>
                            <td>{item.jenis_berita}</td>
                            <td>{item.ringkasan}</td>
                            <td>{item.keywords}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewsList;
