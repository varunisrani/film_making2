'use client';

import { useState } from 'react';
import { Box, Button, Typography, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// Define a simple theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4361ee',
    },
  },
});

export default function TestPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">Test Page</Typography>
        <Button variant="contained" color="primary">
          Test Button
        </Button>
      </Box>
    </ThemeProvider>
  );
}