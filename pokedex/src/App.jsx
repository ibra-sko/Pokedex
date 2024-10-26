import React, { useState } from 'react';
import { PokemonProvider } from './Context/PokemonContext';
import Search from './Components/Search/Search.jsx';
import PokemonList from './Context/PokemonList';
import Header from "./Components/Header/Header.jsx";

function App() {
    const [language, setLanguage] = useState("en");

    return (
        <PokemonProvider>
            <div className="App">
                <Header language={language} setLanguage={setLanguage} />
                <Search />
                <PokemonList language={language} /> {/* Le composant PokemonList utilise le contexte */}
            </div>
        </PokemonProvider>
    );
}

export default App;