import React, { useEffect, useState } from "react";
import Logo from "../../assets/logoPokedex.svg";
import { Select, MenuItem, Box } from '@mui/material';
function Header({ language, setLanguage }) {
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }

        fetch('https://pokedex-jgabriele.vercel.app/types.json')
            .then(response => response.json())
            .then(data => setTranslations(data))
            .catch(error => console.error('Error fetching translations:', error));
    }, [setLanguage]);

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    return (
        <header className="header">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, color: 'white' }}>
                <Box
                    component="img"
                    src={Logo}
                    alt="Pokedex Logo"
                    sx={{
                        height: 80,
                    }}
                />
                <Select
                    value={language}
                    onChange={handleLanguageChange}
                    sx={{ minWidth: 120 }}
                >
                    <MenuItem value="en">En</MenuItem>
                    <MenuItem value="fr">Fr</MenuItem>
                    <MenuItem value="ja">Ja</MenuItem>
                    <MenuItem value="ko">Ko</MenuItem>
                    <MenuItem value="de">Ge</MenuItem>
                    <MenuItem value="es">Sp</MenuItem>
                    <MenuItem value="it">It</MenuItem>
                </Select>
            </Box>
        </header>
    );
}

export default Header;
