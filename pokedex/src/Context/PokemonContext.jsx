import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

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
                const response = await axios.get('https://pokedex-jgabriele.vercel.app/pokemons.json');
                const data = response.data;

                console.log('Data fetched:', data); // Vérifiez la structure ici

                if (data && data.results) {
                    setPokemonData(data.results); // Si les données sont dans 'results'
                } else {
                    setPokemonData(data); // Sinon, assignez les données directement
                }

                setPokemonLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setPokemonLoading(false);
            }
        };

        fetchPokemonData();
    }, []);


    return (
        <PokemonContext.Provider value={{ searchValue, setSearchValue, pokemonData, pokemonLoading }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemon = () => useContext(PokemonContext);