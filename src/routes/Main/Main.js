// Main.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    POKEAPI_SPRITE_URL,
    POKEAPI_URL,
} from '../../config/config';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PokeCard from './PokeCard';
import TablePagination from '@mui/material/TablePagination';
import SearchByName from "./SearchByName";
import FilterByType from "./FilterByType";

export default function Main() {
    const [pokemonList, setPokemonList] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [filterTerm, setFilterTerm] = useState('');

    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(POKEAPI_URL + '?limit=100', POKEAPI_SPRITE_URL);
                const promises = response.data.results.map(async (pokemon, index) => {
                    const types = await GetPokemonTypes(pokemon.url);
                    return {
                        id: index + 1,
                        name: pokemon.name,
                        url: POKEAPI_SPRITE_URL + (index + 1) + '.svg',
                        types: types,
                    };
                });
                const pokemonData = await Promise.all(promises);
                setPokemonList(pokemonData);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };
        fetchPokemon();
    }, []);

    const GetPokemonTypes = async (url) => {
        try {
            const response = await axios.get(url);
            const types = response.data.types.map((type) => type.type.name);
            return types;
        } catch (error) {
            console.error('Error fetching Pokemon types:', error);
            return [];
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setFilterTerm(event.target.value);
        const filteredList = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredPokemonList(filteredList);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        const filteredList = pokemonList.filter((pokemon) =>
            event.target.value === '' || pokemon.types.includes(event.target.value)
        );
        setFilteredPokemonList(filteredList);
    };

    const distinctTypes = Array.from(
        new Set(pokemonList.flatMap((pokemon) => pokemon.types))
    );

    const paginatedPokemon = filteredPokemonList.length > 0
        ? filteredPokemonList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : pokemonList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <Box width="13em" minWidth="13em" order={-1} mr={2} mt={5}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5">Filters</Typography>
                        <SearchByName value={filterTerm} onChange={handleSearchChange} />
                        <FilterByType value={selectedType} onChange={handleTypeChange} options={distinctTypes} />
                    </Paper>
                </Box>
            </Grid>

            <Grid item xs={10}>
                <TablePagination
                    component="div"
                    count={filteredPokemonList.length > 0 ? filteredPokemonList.length : pokemonList.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Grid container direction="row" justifyContent="center" alignItems="baseline">
                    {paginatedPokemon.map((pokemon) => (
                        <Grid item xs="auto" md={4} mt={5} key={pokemon.id}>
                            <PokeCard pokemon={pokemon} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
