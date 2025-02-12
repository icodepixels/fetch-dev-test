import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Dog } from '../types/types';
import { useStore } from '../store/useStore';

interface DogCardProps {
    dog: Dog;
}

export const DogCard = ({ dog }: DogCardProps) => {
    const { favorites, addFavorite, removeFavorite } = useStore();
    const isFavorite = favorites.has(dog.id);

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="200"
                image={dog.img}
                alt={dog.name}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="h2">
                        {dog.name}
                    </Typography>
                    <IconButton
                        onClick={() => isFavorite ? removeFavorite(dog.id) : addFavorite(dog.id)}
                        color="primary"
                    >
                        {isFavorite ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </Box>
                <Typography variant="body1">Breed: {dog.breed}</Typography>
                <Typography variant="body2">Age: {dog.age} years</Typography>
                <Typography variant="body2">Location: {dog.zip_code}</Typography>
            </CardContent>
        </Card>
    );
};