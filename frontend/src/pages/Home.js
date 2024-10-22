import React from 'react';
import ImageUpload from '../components/ImageUpload';
import { Container, Typography } from '@mui/material';
import './styles/Home.css';  // Import the CSS file for Home page

function Home() {
  return (
    <Container>
      <div className="home-container">
        <Typography className="home-title">
          Welcome to Image Description Service
        </Typography>
        <Typography className="home-subtitle">
          Upload an image and let our AI-powered system describe it in two lines.
        </Typography>
      </div>
      <ImageUpload />
    </Container>
  );
}

export default Home;
