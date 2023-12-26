import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    POKEAPI_SPRITE_URL,
    POKEAPI_URL,
} from '../config/config';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";


export default function Main() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(POKEAPI_URL + '?limit=100', POKEAPI_SPRITE_URL);
                const obj = response.data.results.map((pokemon, index) => ({
                    id: index,
                    name: pokemon.name,
                    url: POKEAPI_SPRITE_URL + (index + 1) + '.svg',
                }));
                setPokemonList(obj);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };
        fetchPokemon();
    }, []);

    return (
        <Grid container>
            <Box width="13em" minWidth="13em" order={-1} mr={2} mt={5}>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant="h5">Filters</Typography>
                    <TextField
                        label="Search by name"
                        margin="normal"
                        fullWidth
                    />
                </Paper>
            </Box>
            <Grid item xs={10}>
                <h1>Pokemon List</h1>
                <Grid container spacing={2}>
                    {pokemonList.map((pokemon) => (
                        <Grid item key={pokemon.id} xs={4}>
                            <Card >
                                <CardContent>
                                    <img src={pokemon.url} alt={pokemon.name} />
                                    <Typography variant="h5" gutterBottom>{pokemon.name}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}
