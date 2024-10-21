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
                // Axios retourne directement les données dans response.data
                const data = response.data;

                console.log('Data fetched:', data.names); // Debug pour vérifier les données

                if (data && data.results) {
                    setPokemonData(data.results); // Supposant que 'results' contient la liste des Pokémon
                } else {
                    setPokemonData(data); // Fallback si les données sont directement un tableau
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