import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonProvider } from './Context/PokemonContext';
import { LanguageProvider } from './Context/LanguageContext';
import Search from './Components/Search/Search.jsx';
import PokemonList from './Context/PokemonList';
import Header from "./Components/Header/Header.jsx";
import PokemonDetails from './Components/PokemonDetails/pokemondetail.jsx';

function App() {
    return (
        <LanguageProvider>
            <PokemonProvider>
                <Router>
                    <div className="App">
                        <Header />
                        <Routes>
                            <Route path="/" element={<PokemonList />} />
                            <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
                        </Routes>
                        <Search />
                    </div>
                </Router>
            </PokemonProvider>
        </LanguageProvider>
    );
}

export default App;