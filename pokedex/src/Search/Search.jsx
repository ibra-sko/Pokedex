import React from "react";
import "./search.css";
import { useState } from 'react'
import {colors, TextField} from "@mui/material";
import { usePokemon} from "../Context/PokemonContext.jsx";
import Box from '@mui/material/Box';

function Search() {
  const {searchValue, setSearchValue} = usePokemon();

  return (
    <Box className="search">
        <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ width: '99%',
            borderColor: 'white',}}
        />
    </Box>
  );
}
export default Search;
