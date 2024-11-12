import React, { useEffect, useState } from 'react';
import { usePokemon } from './PokemonContext';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Select, MenuItem, CardActionArea } from '@mui/material';

function PokemonList({ language }) {
    const { pokemonData, pokemonLoading, searchValue } = usePokemon();
    const [typeColors, setTypeColors] = useState({});
    const [selectedType, setSelectedType] = useState(localStorage.getItem("selectedType") || "");

    useEffect(() => {
        // Fetch type colors and translations
        fetch('https://pokedex-jgabriele.vercel.app/types.json')
            .then(response => response.json())
            .then(data => setTypeColors(data))
            .catch(error => console.error('Error fetching type colors:', error));
    }, []);

    // Update localStorage when selectedType changes
    useEffect(() => {
        localStorage.setItem("selectedType", selectedType);
    }, [selectedType]);

    if (pokemonLoading) {
        return <p>Loading Pokémon data...</p>;
    }

    if (!Array.isArray(pokemonData)) {
        return <p>No Pokémon data available.</p>;
    }

    // Filter Pokémon based on search and type
    const filteredPokemon = pokemonData.filter(pokemon => {
        const matchesSearch = pokemon.names?.[language]?.toLowerCase().includes(searchValue.toLowerCase());
        const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
        return matchesSearch && matchesType;
    });

    return (
        <Box>
            {/* Select Filter by Type */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    displayEmpty
                    sx={{
                        minWidth: 150,
                        bgcolor: 'white',
                        borderRadius: '4px',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <MenuItem value="">All Types</MenuItem>
                    {Object.keys(typeColors).map((type) => (
                        <MenuItem key={type} value={type}>
                            {typeColors[type]?.translations[language] || type}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Pokémon List */}
            <Grid container spacing={4} sx={{ padding: '20px' }}>
                {filteredPokemon.map((pokemon) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                        <Card sx={{ maxWidth: 350, borderRadius: 6, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                            <CardActionArea>
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
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        No: {pokemon.id}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: 1 }}>
                                        {pokemon.types.map((type) => (
                                            <Box
                                                key={type}
                                                sx={{
                                                    backgroundColor: typeColors[type]?.backgroundColor || '#A8A878',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                {typeColors[type]?.translations[language] || type}
                                            </Box>
                                        ))}
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default PokemonList;