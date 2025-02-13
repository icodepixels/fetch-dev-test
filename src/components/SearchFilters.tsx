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
    Button,
    CircularProgress
} from '@mui/material';
import { fetchApi } from '../api/fetchApi';
import { SearchFilters as SearchFiltersType, Location as LocationType } from '../types/types';

interface SearchFiltersProps {
    onFilterChange: (filters: SearchFiltersType) => void;
}

interface BreedOption {
    id: string;
    name: string;
}

interface ApiLocation {
    zip_code: number;
    lat: number;
    lon: number;
    city: string;
    state: string;
    county: string;
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
    const [breeds, setBreeds] = useState<BreedOption[]>([]);
    const [selectedBreeds, setSelectedBreeds] = useState<BreedOption[]>([]);
    const [locations, setLocations] = useState<LocationType[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<LocationType[]>([]);
    const [isLocationsLoading, setIsLocationsLoading] = useState(true);
    const [ageMin, setAgeMin] = useState<string>('');
    const [ageMax, setAgeMax] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('breed:asc');
    const [isBreedsLoading, setIsBreedsLoading] = useState(true);

    const loadLocations = async () => {
        setIsLocationsLoading(true);
        try {
            const response = await fetchApi.getLocations();
            const formattedLocations: LocationType[] = ((response as unknown) as ApiLocation[]).map(loc => ({
                zip_code: loc.zip_code?.toString(),
                latitude: loc.lat,
                longitude: loc.lon,
                city: loc.city,
                state: loc.state,
                county: loc.county
            }));
            setLocations(formattedLocations);
        } catch (error) {
            console.error('Error loading locations:', error);
        }
        setIsLocationsLoading(false);
    };

    useEffect(() => {
        const loadBreeds = async () => {
            setIsBreedsLoading(true);
            try {
                const breedList = await fetchApi.getBreeds();
                setBreeds(breedList.map(breed => ({ id: breed, name: breed })));
            } catch (error) {
                console.error('Error loading breeds:', error);
            }
            setIsBreedsLoading(false);
        };
        loadBreeds();
        loadLocations();
    }, []);

    const handleApplyFilters = () => {
        onFilterChange({
            breeds: selectedBreeds.map(breed => breed.id),
            ageMin: ageMin ? parseInt(ageMin) : undefined,
            ageMax: ageMax ? parseInt(ageMax) : undefined,
            sort: sortOrder,
            zipCodes: selectedLocations.map(loc => loc.zip_code),
        });
    };

    return (
        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Autocomplete
                multiple
                options={breeds}
                value={selectedBreeds}
                onChange={(_, newValue) => setSelectedBreeds(newValue)}
                getOptionLabel={(option) => option.name}
                loading={isBreedsLoading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Breeds"
                        sx={{ minWidth: 200 }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isBreedsLoading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                sx={{ flexGrow: 1 }}
            />
            <Autocomplete
                multiple
                options={locations}
                value={selectedLocations}
                onChange={(_, newValue) => setSelectedLocations(newValue)}
                getOptionLabel={(option) => `${option.city}, ${option.state} ${option.zip_code}`}
                loading={isLocationsLoading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Locations"
                        sx={{ minWidth: 200 }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isLocationsLoading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
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