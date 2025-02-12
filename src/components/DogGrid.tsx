import React from 'react';
import { Grid } from '@mui/material';
import { DogCard } from './DogCard';
import { Dog } from '../types/types';

interface DogGridProps {
    dogs: Dog[];
}

export const DogGrid = ({ dogs }: DogGridProps) => {
    return (
        <Grid container spacing={3}>
            {dogs.map((dog) => (
                <Grid item key={dog.id} xs={12} sm={6} md={4} lg={3}>
                    <DogCard dog={dog} />
                </Grid>
            ))}
        </Grid>
    );
};