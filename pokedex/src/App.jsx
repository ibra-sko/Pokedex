import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PokemonProvider } from "./Context/PokemonContext";
import { LanguageProvider } from "./Context/LanguageContext";
import Search from "./Components/Search/Search.jsx";
import PokemonList from "./Components/PokemonList/PokemonList.jsx"; // Correct import path
import Header from "./Components/Header/Header.jsx";
import PokemonDetails from "./Components/PokemonDetails/Pokemondetail.jsx"; // Correct import path

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

                            {/* Route pour gérer les URL inconnues */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </Router>
            </PokemonProvider>
        </LanguageProvider>
    );
}

export default App;
