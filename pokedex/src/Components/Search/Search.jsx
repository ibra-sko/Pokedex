import React from "react";
import { usePokemon } from "../../Context/PokemonContext.jsx";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';

function Search() {
    const { searchValue, setSearchValue } = usePokemon();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh', // Centre verticalement

            }}
        >
            <TextField
                id="outlined-basic"
                label="Enter Pokémon name"
                variant="outlined"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{
                    width: '90%', // Largeur de la barre de recherche (ajustez si nécessaire)
                    input: { color: 'white' }, // Couleur du texte
                    label: { color: 'white' }, // Couleur du label "Search"
                    '.MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // Couleur de la bordure
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // Couleur de la bordure au survol
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // Couleur de la bordure lorsqu'elle est focus
                        },
                    },
                }}
            />
        </Box>
    );
}

export default Search;
