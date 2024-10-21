import React from 'react';
import { PokemonProvider } from './Context/PokemonContext';
import { Search } from './Search/Search';
import { PokemonList } from './Context/PokemonList';
function App() {
    return (
        <PokemonProvider>
            <div className="App">
                <h1>Pokémon App</h1>
                <Search />
                <PokemonList /> {/* Le composant PokemonList utilise le contexte */}
            </div>
        </PokemonProvider>
    );
}

export default App;
