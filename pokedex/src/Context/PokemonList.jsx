// Components/PokemonList.jsx
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../Context/LanguageContext'; // Importer le hook
import { usePokemon } from './PokemonContext'; // Importer le contexte des Pokémon
import { Card, CardContent, CardMedia, Typography, Grid, Box, Select, MenuItem } from '@mui/material';

function PokemonList() {
    const { language } = useLanguage(); // Utiliser le contexte pour récupérer la langue
    const { pokemonData, pokemonLoading, searchValue } = usePokemon();
    const [typeColors, setTypeColors] = useState({});
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        fetch('https://pokedex-jgabriele.vercel.app/types.json')
            .then(response => response.json())
            .then(data => setTypeColors(data))
            .catch(error => console.error('Error fetching type colors:', error));
    }, []);

    if (pokemonLoading) return <p>Loading Pokémon data...</p>;

    const filteredPokemon = pokemonData.filter(pokemon => {
        const matchesSearch = pokemon.names?.[language]?.toLowerCase().includes(searchValue.toLowerCase());
        const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
        return matchesSearch && matchesType;
    });

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 120 }}
                >
                    <MenuItem value="">All Types</MenuItem>
                    {Object.keys(typeColors).map((type) => (
                        <MenuItem key={type} value={type}>
                            {typeColors[type]?.translations[language] || type}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Grid container spacing={4} sx={{ padding: '20px' }}>
                {filteredPokemon.map((pokemon) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                        <Card sx={{ maxWidth: 350, borderRadius: 6 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                                    {pokemon.names?.[language] || pokemon.names?.en || 'Unknown Pokémon'}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 170, width: "50%" }}
                                    image={pokemon.image}
                                    alt={pokemon.names?.[language] || 'Unknown Pokémon'}
                                />
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default PokemonList;
