import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { POKEAPI_URL } from '../../config/config';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
} from '@mui/material';

const PokeDetails = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(POKEAPI_URL + id);
                setPokemon(response.data);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };
        fetchPokemon();
    }, [id]);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                margin: '10vh auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Grid container spacing={2} style={{ maxWidth: '1000px' }}>
                <Grid item xs={12} sm={6}>
                    <Card
                        sx={{
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CardContent>
                            {pokemon && (
                                <CardMedia
                                    component="img"
                                    image={pokemon.sprites.other.dream_world.front_default}
                                    alt={pokemon.name}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card
                        sx={{
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CardContent>
                            {pokemon && (
                                <>
                                    <Typography variant="h5" gutterBottom component="div">
                                        {pokemon.name}
                                    </Typography>
                                    <Divider />
                                    <List>
                                        <ListItem>
                                            <ListItemText primary="ID" secondary={pokemon.id} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Types" secondary={pokemon.types.map((type) => type.type.name).join(', ')} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Base Experience" secondary={pokemon.base_experience} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Height" secondary={pokemon.height} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Weight" secondary={pokemon.weight} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary="Abilities" secondary={pokemon.abilities.map((ability) => ability.ability.name).join(', ')} />
                                        </ListItem>
                                    </List>
                                    <Button variant="contained" color="primary" href="/">
                                        Back
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default PokeDetails;
