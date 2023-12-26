import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    POKEAPI_SPRITE_URL,
    POKEAPI_URL,
} from '../../config/config';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PokeCard from './PokeCard';
import TablePagination from '@mui/material/TablePagination';

export default function Main() {
    const [pokemonList, setPokemonList] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [filterTerm, setFilterTerm] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(POKEAPI_URL + '?limit=100', POKEAPI_SPRITE_URL);
                const obj = response.data.results.map((pokemon, index) => ({
                    id: index + 1,
                    name: pokemon.name,
                    url: POKEAPI_SPRITE_URL + (index + 1) + '.svg',
                    types: pokemon.types,
                }));
                setPokemonList(obj);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };
        fetchPokemon();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedPokemon = pokemonList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleFilterChange = (event) => {
        setFilterTerm(event.target.value);
        const filteredList = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredPokemonList(filteredList);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <Box width="13em" minWidth="13em" order={-1} mr={2} mt={5}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h5">Filters</Typography>
                        <TextField
                            label="Search by name"
                            value={filterTerm}
                            onChange={handleFilterChange}
                            margin="normal"
                            fullWidth
                        />
                    </Paper>
                </Box>
            </Grid>

            <Grid item xs={10}>
                <TablePagination
                    component="div"
                    count={pokemonList.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Grid container direction="row" justifyContent="center" alignItems="baseline">
                    {filteredPokemonList.length > 0
                        ? filteredPokemonList.map((pokemon) => (
                            <Grid item xs="auto" md={4} mt={5} key={pokemon.id}>
                                <PokeCard pokemon={pokemon}/>
                            </Grid>
                        ))
                        : paginatedPokemon.map((pokemon) => (
                            <Grid item xs="auto" md={4} mt={5}  key={pokemon.id}>
                                <PokeCard pokemon={pokemon}/>
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
