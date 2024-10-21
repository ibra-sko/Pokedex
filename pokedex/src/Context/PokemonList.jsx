// src/Context/PokemonList.jsx
import React from 'react';
import { usePokemon } from './PokemonContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';

function PokemonList() {
    const { pokemonData, pokemonLoading } = usePokemon();

    if (pokemonLoading) {
        return <p>Loading Pokémon data...</p>;
    }

    // Vérifiez que pokemonData est un tableau avant d'utiliser map
    if (!Array.isArray(pokemonData)) {
        return <p>No Pokémon data available.</p>;
    }

    return (
        <Grid container spacing={2} sx={{ padding: '20px' }}>
            {pokemonData.map((pokemon, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardActionArea>
                            {/* Image du Pokémon */}
                            <CardMedia sx={{
                                height: 170,
                                width: "60%",
                                component: "img",
                            }}
                                image={pokemon.image} // Affichage de l'image spécifique
                                alt={pokemon.names?.en || 'Unknown Pokémon'} // Utilisez le nom en anglais comme fallback
                            />
                            <CardContent>
                                {/* Nom du Pokémon */}
                                <Typography gutterBottom variant="h5" component="div">
                                    {pokemon.names?.en || 'Unknown Pokémon'}
                                </Typography>
                                {/* Affichage de l'ID */}
                                <Typography variant="body2" color="text.secondary">
                                    ID: {pokemon.id}
                                </Typography>
                                {/* Affichage des types */}
                                {pokemon.types && (
                                    <Typography variant="body2" color="text.secondary">
                                        Types: {pokemon.types.join(', ')}
                                    </Typography>
                                )}
                                {/* Affichage de la hauteur et du poids */}
                                <Typography variant="body2" color="text.secondary">
                                    Height: {pokemon.height} | Weight: {pokemon.weight}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default PokemonList;
