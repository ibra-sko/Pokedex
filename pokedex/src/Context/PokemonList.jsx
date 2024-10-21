import React from 'react';
import { usePokemon } from '../Context/PokemonContext'; // Ajustez le chemin selon votre structure

function PokemonList() {
    const { pokemonData, pokemonLoading } = usePokemon(); // Utiliser le hook pour accéder aux données

    return (
        <div>
            {pokemonLoading ? (
                <p>Loading Pokémon data...</p>
            ) : (
                <ul>
                    {pokemonData.map((pokemon, index) => (
                        <li key={index}>{pokemon.name}</li> // Supposant que chaque Pokémon a une propriété 'name'
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PokemonList;
