import React from 'react';
import { LanguageProvider } from './Context/LanguageContext'; // Importer le contexte de langue
import Search from './Components/Search/Search.jsx';
import PokemonList from './Components/PokemonList'; // Assurez-vous que PokemonList est bien importé depuis Components
import Header from './Components/Header/Header.jsx';

function App() {
    return (
        <LanguageProvider>
            <div className="App">
                <Header />
                <Search />
                <PokemonList />
            </div>
        </LanguageProvider>
    );
}

export default App;
