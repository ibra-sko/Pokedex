import React, { useEffect, useState } from 'react';
import { usePokemon } from './PokemonContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea, Box } from '@mui/material';

function PokemonList({ language }) {
    const { pokemonData, pokemonLoading } = usePokemon();
    const [typeColors, setTypeColors] = useState({});

    useEffect(() => {
        fetch('https://pokedex-jgabriele.vercel.app/types.json')
            .then(response => response.json())
            .then(data => setTypeColors(data))
            .catch(error => console.error('Error fetching type colors:', error));
    }, []);

    if (pokemonLoading) {
        return <p>Loading Pokémon data...</p>;
    }

    if (!Array.isArray(pokemonData)) {
        return <p>No Pokémon data available.</p>;
    }

    return (
        <Grid container spacing={8} sx={{ padding: '20px' }}>
            {pokemonData.map((pokemon, index) => (
                <Grid item xs={12} sm={6} md={7} lg={3} key={index}>
                    <Card sx={{ maxWidth: 350, borderRadius: 6 }}>
                        <CardActionArea>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                                    {pokemon.names?.[language] || 'Unknown Pokémon'}
                                </Typography>
                                <CardMedia
                                    sx={{ height: 170, width: "50%", component: "img" }}
                                    image={pokemon.image}
                                    alt={pokemon.names?.[language] || 'Unknown Pokémon'}
                                />
                            </Box>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                                <Typography variant="body2" color="text.secondary">
                                    No: {pokemon.id}
                                </Typography>
                                {pokemon.types && (
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {pokemon.types.map((type) => (
                                            <Box key={type} sx={{ backgroundColor: typeColors[type] || '#A8A878', color: 'white', padding: '2px 8px', borderRadius: '4px' }}>
                                                {type}
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default PokemonList;