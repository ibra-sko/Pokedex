import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';
import { useLanguage } from '../../Context/LanguageContext';
import { useNavigate } from 'react-router-dom';

import Logo from "../../assets/logoPokedex.svg";

function Header() {
    const { language, setLanguage } = useLanguage();
    const navigate = useNavigate();

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <header className="header">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, color: 'white' }}>
                <img src={Logo} className="logo" alt="Pokedex Logo" style={{ height: '80px', cursor: 'pointer' }} onClick={handleLogoClick} />
                <Select
                    value={language}
                    onChange={handleLanguageChange}
                    sx={{ minWidth: 120, bgcolor: 'white', color: 'black' }}
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