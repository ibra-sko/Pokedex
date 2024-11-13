// Components/Header/Header.jsx
import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';
import { useLanguage } from '../../Context/LanguageContext'; // Importer le hook

import Logo from "../../assets/logoPokedex.svg";
import './Header.css';

function Header() {
    const { language, setLanguage } = useLanguage(); // Utiliser le contexte pour la langue

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
