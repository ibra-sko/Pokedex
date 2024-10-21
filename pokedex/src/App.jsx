import React from 'react';
import { PokemonProvider } from './Context/PokemonContext';
import  Search  from './Components/Search/Search.jsx';
import  PokemonList  from './Context/PokemonList';
import Header from "./Components/Header/Header.jsx";
function App() {
    return (


        <PokemonProvider>
            <div className="App">
                <Header />
                <Search />
                <PokemonList /> {/* Le composant PokemonList utilise le contexte */}
            </div>
        </PokemonProvider>
        );
}

export default App;
