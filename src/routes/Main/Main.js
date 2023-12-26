import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    POKEAPI_SPRITE_URL,
    POKEAPI_URL,
} from '../../config/config'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import PokeCard from './PokeCard'

export default function Main() {
    const [pokemonList, setPokemonList] = useState([])


    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(POKEAPI_URL + '?limit=100', POKEAPI_SPRITE_URL)
                const obj = response.data.results.map((pokemon, index) => ({
                    id: index + 1,
                    name: pokemon.name,
                    url: POKEAPI_SPRITE_URL + (index + 1) + '.svg'
                }))
                setPokemonList(obj)
            } catch (error) {
                console.error('Error fetching Pokemon data:', error)
            }
        };
        fetchPokemon()
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs>
                <Box minWidth="13em" mr={2} mt={5}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h5">Filters</Typography>
                        <TextField label="Search by name" margin="normal" fullWidth/>
                    </Paper>
                </Box>
            </Grid>

            <Grid item xs={10}>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="baseline">
                    {pokemonList.map((pokemon) => (
                        <Grid item xs="auto" md={4} key={pokemon.id} mt={5}>
                            <PokeCard pokemon={pokemon}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}
