import React from 'react';
import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Autocomplete,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material';
import { fetchApi } from '../api/fetchApi';
import { SearchFilters as SearchFiltersType } from '../types/types';

interface SearchFiltersProps {
    onFilterChange: (filters: SearchFiltersType) => void;
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
    const [ageMin, setAgeMin] = useState<string>('');
    const [ageMax, setAgeMax] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('breed:asc');

    useEffect(() => {
        const loadBreeds = async () => {
            const breedList = await fetchApi.getBreeds();
            setBreeds(breedList);
        };
        loadBreeds();
    }, []);

    const handleApplyFilters = () => {
        onFilterChange({
            breeds: selectedBreeds,
            ageMin: ageMin ? parseInt(ageMin) : undefined,
            ageMax: ageMax ? parseInt(ageMax) : undefined,
            sort: sortOrder,
        });
    };

    return (
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Autocomplete
                multiple
                options={breeds}
                value={selectedBreeds}
                onChange={(_, newValue) => setSelectedBreeds(newValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Breeds" sx={{ minWidth: 200 }} />
                )}
                sx={{ flexGrow: 1 }}
            />
            <TextField
                label="Min Age"
                type="number"
                value={ageMin}
                onChange={(e) => setAgeMin(e.target.value)}
                sx={{ width: 100 }}
            />
            <TextField
                label="Max Age"
                type="number"
                value={ageMax}
                onChange={(e) => setAgeMax(e.target.value)}
                sx={{ width: 100 }}
            />
            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={sortOrder}
                    label="Sort By"
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <MenuItem value="breed:asc">Breed (A-Z)</MenuItem>
                    <MenuItem value="breed:desc">Breed (Z-A)</MenuItem>
                    <MenuItem value="age:asc">Age (Low-High)</MenuItem>
                    <MenuItem value="age:desc">Age (High-Low)</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handleApplyFilters}>
                Apply Filters
            </Button>
        </Box>
    );
};