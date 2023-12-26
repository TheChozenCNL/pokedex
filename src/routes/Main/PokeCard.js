/* eslint-disable react/prop-types */
import React from 'react'
import {Button, Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function PokeCard(props) {

    const {pokemon} = props

    return (
        <Card sx={{maxWidth: 400}}>
            <CardMedia
                component="img"
                aspect={1}
                image={pokemon.url}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {pokemon.name}

                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

