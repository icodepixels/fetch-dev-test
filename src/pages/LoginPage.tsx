import React from 'react';
import { Box } from '@mui/material';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                bgcolor: 'grey.100'
            }}
        >
            <LoginForm />
        </Box>
    );
};