import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchApi } from '../api/fetchApi';
import { useStore } from '../store/useStore';
import { Dog } from '../types/types';

export const MatchPage = () => {
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
    const { favorites, clearFavorites } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        const getMatch = async () => {
            try {
                const favoriteIds = Array.from(favorites);
                const { match } = await fetchApi.getMatch(favoriteIds);
                const [dog] = await fetchApi.getDogs([match]);
                setMatchedDog(dog);
            } catch (error) {
                console.error('Error getting match:', error);
            }
        };

        if (favorites.size > 0) {
            getMatch();
        }
    }, [favorites]);

    const handleStartOver = () => {
        clearFavorites();
        navigate('/search');
    };

    if (!matchedDog) {
        return (
            <Container>
                <Typography>Loading your match...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                You've Been Matched!
            </Typography>

            <Card sx={{ mt: 4 }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={matchedDog.img}
                    alt={matchedDog.name}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Meet {matchedDog.name}!
                    </Typography>
                    <Typography variant="body1">
                        Breed: {matchedDog.breed}
                    </Typography>
                    <Typography variant="body1">
                        Age: {matchedDog.age} years
                    </Typography>
                    <Typography variant="body1">
                        Zip Code: {matchedDog.zip_code}
                    </Typography>
                </CardContent>
            </Card>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    onClick={handleStartOver}
                    size="large"
                >
                    Start New Search
                </Button>
            </Box>
        </Container>
    );
};