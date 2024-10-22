import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

function Navbar() {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" className="navbar-brand">
          AI Image Describer
        </Typography>
        <Box className="navbar-links">
          <Button className="navbar-button" component={Link} to="/">
            Home
          </Button>
          <Button className="navbar-button" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button className="navbar-button" component={Link} to="/history">
            History
          </Button>
          <Button className="navbar-button" component={Link} to="/pricing">
            Pricing
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
