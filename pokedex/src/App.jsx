import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./Context/PokemonContext";
import { LanguageProvider } from "./Context/LanguageContext";
import Search from "./Components/Search/Search.jsx";
import PokemonList from "./Components/PokemonList/PokemonList.jsx";
import Header from "./Components/Header/Header.jsx";
import PokemonDetails from "./Components/PokemonDetails/Pokemondetail.jsx";

function App() {
    return (
        <LanguageProvider>
            <PokemonProvider>
                <Router>
                    <div className="App">
                        <Header />
                        <Routes>
                            {/* Route pour la page principale */}
                            <Route
                                path="/"
                                element={
                                    <>
                                        <Search />
                                        <PokemonList />
                                    </>
                                }
                            />

                            {/* Route pour les détails d'un Pokémon */}
                            <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
                        </Routes>
                    </div>
                </Router>
            </PokemonProvider>
        </LanguageProvider>
    );
}

export default App;
