import React from 'react';
import './App.css';
import NewsList from './components/NewsList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Daftar Berita</h1>
            </header>
            <main>
                <NewsList />
            </main>
        </div>
    );
}

export default App;
