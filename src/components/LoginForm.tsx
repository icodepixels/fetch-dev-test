import React from 'react';
import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useStore } from '../store/useStore';
import { fetchApi } from '../api/fetchApi';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const setUser = useStore(state => state.setUser);
    const navigate = useNavigate();

    const { login } = fetchApi;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(name, email);
            setUser({ name, email });
            navigate('/search');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Welcome to Dog Finder
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                    >
                        Login
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};