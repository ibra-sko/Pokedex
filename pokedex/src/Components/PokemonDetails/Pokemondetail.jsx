import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Typography,
    CardActionArea,
    CardMedia,
    CardContent,
    Card
} from "@mui/material";
import { PokemonContext } from "../../Context/PokemonContext";

function PokemonDetails() {
    const { pokemonId } = useParams(); // Récupère l'ID du Pokémon de l'URL
    const { pokemonData } = useContext(PokemonContext); // Récupère la liste des Pokémon depuis le contexte
    const [pokemon, setPokemon] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate(); // Utilisation de `useNavigate` pour rediriger

    useEffect(() => {
        if (pokemonData && pokemonData.length > 0) {
            const foundPokemon = pokemonData.find((p) => p.id === parseInt(pokemonId)); // Cherche le Pokémon par ID
            setPokemon(foundPokemon || null); // Si trouvé, mettre à jour l'état, sinon mettre à null
        }
    }, [pokemonData, pokemonId]);

    if (!pokemon) {
        return <Typography variant="h4">No Pokémon found with ID {pokemonId}</Typography>; // Affiche un message si le Pokémon n'est pas trouvé
    }

    return (
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 350, borderRadius: 6 }}>
                <CardActionArea>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                            {pokemon.names?.en || 'Unknown Pokémon'}
                        </Typography>
                        <CardMedia
                            component="img"
                            sx={{ height: 170, width: "50%" }}
                            image={pokemon.image}
                            alt={pokemon.names?.en || 'Unknown Pokémon'}
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
                                        backgroundColor: '#A8A878', // Utilisation d'une couleur par défaut pour les types
                                        color: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                    }}
                                >
                                    {type}
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ marginTop: 2 }}>
                Show Moves
            </Button>

            {/* Dialog pour afficher les moves */}
            <Dialog
                aria-labelledby="pokemon-moves-dialog"
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle id="pokemon-moves-dialog">Moves</DialogTitle>
                <DialogContent>
                    {/* Vérification si les moves existent */}
                    {pokemon.moves && pokemon.moves.length > 0 ? (
                        pokemon.moves.map((move, index) => (
                            <Typography key={index}>{move}</Typography>
                        ))
                    ) : (
                        <Typography>No moves available.</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default PokemonDetails;
