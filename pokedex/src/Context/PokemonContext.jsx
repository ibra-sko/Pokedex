import React, {useState, useContext, useEffect, createContext} from 'react';



const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonType, setPokemonType] = useState([]);
    const [pokemonLoading, setPokemonLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
        try {
            const response = await fetch('https://pokedex-jgabriele.vercel.app/pokemons.json');
            const data = await response.json();
            const pokemon = await Promise.all(data.results.map(async (pokemon) => {
            const pokemonRecord = await fetchPokemonData(pokemon);
            return pokemonRecord;
            }));
            setPokemonData(pokemon);
            setPokemonLoading(false);
        } catch (e) {
            console.error(e);
        }
        }
        fetchPokemonData();


    }, []);

    const searchValue = async (pokemon) => {
        try {
            const response = await fetch(`https://pokedex-jgabriele.vercel.app/pokemons.json/${pokemon.name}`);
            const data = await response.json();
            const pokemon = await Promise.all(data.results.map(async (pokemon) => {
            const pokemonRecord = await fetchPokemonData(pokemon);
            return pokemonRecord;
            }));
            setPokemonData(pokemon);
            setPokemonLoading(false);
        } catch (e) {
            console.error(e);
        }
    }
    

    return (
        <PokemonContext.Provider value={{ searchValue, setSearchValue, pokemonData, setPokemonData, pokemonType, setPokemonType, pokemonLoading, setPokemonLoading }}>
        {children}
        </PokemonContext.Provider>
    );
}

export const usePokemon = () => useContext(PokemonContext);



// const PokemonContext = ({ children }) => {
//   const [searchValue, setSearchValue] = useState('');
//   let [pokemonData, setPokemonData] = useState([]);
//   const [pokemonType, setPokemonType] = useState([]);
//   const [pokemonLoading, setPokemonLoading] = useState(true);
//
//   //Fonction pour récupérer les données de l'API
//
//   useEffect(() =>
//     {
//
//     const fetchpokemonData = async (pokemon) => {
//       try {
//         const response = await fetch('https://pokedex-jgabriele.vercel.app/pokemons.json/${pokemon.name}');
//         const data = await response.json();
//         const pokemon = await Promise.all(data.results.map(async (pokemon) => {
//           const pokemonRecord = await fetchPokemonData(pokemon);
//           return pokemonRecord;
//         }));
//         setPokemonData(pokemon);
//         setPokemonLoading(false);
//       }
//       catch (e) {
//         console.error(e);
//       }
//
//
//     }
//     fetchpokemonData();
//   });
//   return (
//     <SearchContext.Provider value={[searchValue, setSearchValue]}>
//       {children}
//     </SearchContext.Provider>
//   );
//
// }
//
//
//
