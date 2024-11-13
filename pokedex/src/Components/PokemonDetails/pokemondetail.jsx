import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, Button, Box, Typography } from '@mui/material';

function PokemonDetails() {
    const { pokemonId } = useParams(); // Obtenez l'ID du Pokémon à partir de l'URL
    const [pokemon, setPokemon] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch(`https://pokedex-jgabriele.vercel.app/api/pokemons/${pokemonId}`);
            const data = await response.json();
            setPokemon(data);
        };

        fetchPokemon();
    }, [pokemonId]);

    if (!pokemon) return <p>Loading...</p>;

    return (
        <Box sx={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h4" component="h1">
                {pokemon.name}
            </Typography>
            <Typography variant="h6">ID: {pokemon.id}</Typography>
            <Typography>Weight: {pokemon.weight} kg</Typography>
            <Typography>Height: {pokemon.height} m</Typography>
            <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ marginTop: 2 }}>
                Show Moves
            </Button>

            {/* Dialog to Show Moves */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Moves</DialogTitle>
                <DialogContent>
                    {pokemon.moves.map((move, index) => (
                        <Typography key={index}>{move}</Typography>
                    ))}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default PokemonDetails;