import React, { createContext, useContext, useState, useEffect } from 'react';

// Créer le contexte pour Pokémon
const PokemonContext = createContext();

// Fournisseur du contexte
export const PokemonProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState('');
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonLoading, setPokemonLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch('https://pokedex-jgabriele.vercel.app/pokemons.json');
                const data = await response.json();
                setPokemonData(data.results);
                setPokemonLoading(false);
            } catch (e) {
                console.error(e);
            }
        };
        fetchPokemonData();
    }, []);

    // Composant PokemonList ici
    const PokemonList = () => {
        if (pokemonLoading) {
            return <p>Loading Pokémon data...</p>;
        }

        return (
            <ul>
                {pokemonData.map((pokemon, index) => (
                    <li key={index}>{pokemon.name}</li> // Supposant que chaque Pokémon a une propriété 'name'
                ))}
            </ul>
        );
    };

    return (
        <PokemonContext.Provider value={{ searchValue, setSearchValue, pokemonData, pokemonLoading }}>
            {children}
            <PokemonList /> {/* Placez PokemonList ici pour qu'il soit inclus dans le contexte */}
        </PokemonContext.Provider>
    );
};

// Hook personnalisé pour accéder au contexte
export const usePokemon = () => useContext(PokemonContext);
