import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Container, Pagination, Button, Typography } from '@mui/material';
import { SearchFilters } from '../components/SearchFilters';
import { DogGrid } from '../components/DogGrid';
import { fetchApi } from '../api/fetchApi';
import { Dog, SearchFilters as SearchFiltersType } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const SearchPage = () => {
    const { searchDogs, getDogs } = fetchApi;
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<SearchFiltersType>({
        breeds: [],
        sort: 'breed:asc'
    });

    const favorites = useStore(state => state.favorites);
    const navigate = useNavigate();

    const loadDogs = async () => {
        try {
            const searchResponse = await searchDogs({
                ...filters,
                size: 20,
                from: (page - 1) * 20
            });

            const dogsData = await getDogs(searchResponse.resultIds);
            setDogs(dogsData);
            setTotalPages(Math.ceil(searchResponse.total / 20));
        } catch (error) {
            console.error('Error loading dogs:', error);
        }
    };

    useEffect(() => {
        loadDogs();
    }, [page, filters]);

    const handleFilterChange = (newFilters: SearchFiltersType) => {
        setFilters(newFilters);
        setPage(1);
    };

    const handleMatch = () => {
        if (favorites.size > 0) {
            navigate('/match');
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4, height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 4, flexShrink: 0 }}>
                <SearchFilters onFilterChange={handleFilterChange} />
            </Box>

            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                <Typography variant="h6">
                    {favorites.size} dogs selected
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleMatch}
                    disabled={favorites.size === 0}
                >
                    Find Match
                </Button>
            </Box>

            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                pr: 1,
                mr: -1
            }}>
                <DogGrid dogs={dogs} />
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                />
            </Box>
        </Container>
    );
};