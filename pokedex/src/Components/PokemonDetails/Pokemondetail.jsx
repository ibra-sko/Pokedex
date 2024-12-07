import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
} from "@mui/material";
import { usePokemon } from "../../Context/PokemonContext";
import { useLanguage } from "../../Context/LanguageContext";

function PokemonDetails() {
    const { pokemonId } = useParams(); // Récupère l'ID du Pokémon de l'URL
    const { language } = useLanguage(); // Récupère la langue depuis le contexte de langue
    const { pokemonData } = usePokemon(); // Récupère les données Pokémon depuis le contexte
    const [pokemon, setPokemon] = useState(null);
    const [typeColors, setTypeColors] = useState({});
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        // Charger les couleurs et traductions des types
        fetch("https://pokedex-jgabriele.vercel.app/types.json")
            .then((response) => response.json())
            .then((data) => setTypeColors(data))
            .catch((error) => console.error("Error fetching type colors:", error));
    }, []);

    useEffect(() => {
        if (pokemonData && pokemonData.length > 0) {
            const foundPokemon = pokemonData.find((p) => p.id === parseInt(pokemonId));
            setPokemon(foundPokemon || null);
        }
    }, [pokemonData, pokemonId]);

    if (!pokemon) {
        return (
            <Typography variant="h4" sx={{ textAlign: "center", marginTop: 4 }}>
                No Pokémon found with ID {pokemonId}
            </Typography>
        );
    }

    return (
        <Box sx={{ padding: 2, justifyContent: "center" }}>
            <Card sx={{ maxWidth: 350, borderRadius: 6, margin: "0 auto" }}>
                <CardActionArea>
                    <Box sx={{ flexDirection: "column", alignItems: "center", padding: 2 }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center" }}>
                            {pokemon.names?.[language] || pokemon.names?.en || "Unknown Pokémon"}
                        </Typography>
                        <CardMedia
                            component="img"
                            sx={{ height: 170, width: "50%" }}
                            image={pokemon.image}
                            alt={pokemon.names?.[language] || "Unknown Pokémon"}
                        />
                    </Box>
                    <CardContent sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                        <Typography variant="body2" color="text.secondary">
                            No: {pokemon.id}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: 1 }}>
                            {pokemon.types.map((type) => (
                                <Box
                                    key={type}
                                    sx={{
                                        backgroundColor: typeColors[type]?.backgroundColor || "#A8A878",
                                        color: "white",
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                    }}
                                >
                                    {typeColors[type]?.translations[language] || type}
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Button
                variant="contained"
                onClick={() => setOpenDialog(true)}
                sx={{ marginTop: 2, display: "block", marginLeft: "auto", marginRight: "auto" }}
            >
                {language === "fr" ? "Voir les attaques" : "Show Moves"}
            </Button>

            {/* Dialog pour afficher les moves */}
            <Dialog
                aria-labelledby="pokemon-moves-dialog"
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle id="pokemon-moves-dialog">
                    {language === "fr" ? "Attaques" : "Moves"}
                </DialogTitle>
                <DialogContent>
                    {pokemon.moves && pokemon.moves.length > 0 ? (
                        pokemon.moves.map((move, index) => (
                            <Typography key={index}>{move}</Typography>
                        ))
                    ) : (
                        <Typography>
                            {language === "fr" ? "Aucune attaque disponible." : "No moves available."}
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default PokemonDetails;
