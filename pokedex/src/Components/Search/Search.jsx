import React, { useEffect } from "react";
import { usePokemon } from "../../Context/PokemonContext.jsx";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';

function Search() {
    const { searchValue, setSearchValue } = usePokemon();

    useEffect(() => {
        // Récupérer le texte de recherche stocké dans localStorage si disponible
        const storedSearchValue = localStorage.getItem("searchValue");
        if (storedSearchValue) {
            setSearchValue(storedSearchValue);
        }
    }, [setSearchValue]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        localStorage.setItem("searchValue", value); // Sauvegarder dans localStorage
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh',
            }}
        >
            <TextField
                id="outlined-basic"
                label="Enter Pokémon name"
                variant="outlined"
                value={searchValue}
                onChange={handleSearchChange}
                sx={{
                    width: '90%',
                    input: { color: 'white' },
                    label: { color: 'white' },
                    '.MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'white' },
                        '&:hover fieldset': { borderColor: 'white' },
                        '&.Mui-focused fieldset': { borderColor: 'white' },
                    },
                }}
            />
        </Box>
    );
}

export default Search;
