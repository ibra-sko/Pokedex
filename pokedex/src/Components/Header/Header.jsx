import React, { useEffect, useState } from "react";
import "./header.css";
import Logo from "../../assets/logoPokedex.svg";
import { Select, MenuItem, Box } from '@mui/material';

function Header({ language, setLanguage }) {
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        fetch('https://pokedex-jgabriele.vercel.app/types.json')
            .then(response => response.json())
            .then(data => setTranslations(data))
            .catch(error => console.error('Error fetching translations:', error));
    }, []);

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <header className="header">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, color: 'white' }}>
                <img src={Logo} className="logo" alt="Pokedex Logo" />
                <Select
                    value={language}
                    onChange={handleLanguageChange}
                    sx={{ minWidth: 120 }}
                >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="ja">Japanese</MenuItem>
                    <MenuItem value="ko">Korean</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="it">Italian</MenuItem>
                </Select>
                <p>{translations[language]}</p>
            </Box>
        </header>
    );
}

export default Header;