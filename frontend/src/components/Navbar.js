import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';  // Import the CSS file

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Branding */}
        <Typography className="navbar-brand" component={Link} to="/" sx={{ textDecoration: 'none' }}>
          AI Image Describer
        </Typography>

        {/* Navbar Buttons */}
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
          <Button className="navbar-button" component={Link} to="/" sx={{ color: 'white' }}>
            Home
          </Button>
          <Button className="navbar-button" component={Link} to="/dashboard" sx={{ color: 'white' }}>
            Dashboard
          </Button>
          <Button className="navbar-button" component={Link} to="/history" sx={{ color: 'white' }}>
            History
          </Button>
          <Button className="navbar-button" component={Link} to="/pricing" sx={{ color: 'white' }}>
            Pricing
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
