import React, { useState } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Box } from '@mui/material';
import './styles/ImageUpload.css';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageURL(URL.createObjectURL(file));  // Show image preview
    setLoading(true);  // Show loading spinner while uploading

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
      setDescription(res.data.description);  // Show description
    } catch (err) {
      setMessage('Failed to upload image');
    } finally {
      setLoading(false);  // Hide loading spinner
    }
  };

  return (
    <Box className="image-upload-container">
      <Typography variant="h4" gutterBottom>
        Upload an Image
      </Typography>

      {/* Custom styled label for file input */}
      <label htmlFor="image-upload" className="image-upload-label">
        Choose an Image
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="image-upload-input"  // Hidden input
        onChange={handleImageChange}  // Automatically upload on image selection
      />

      {/* Show the uploaded image preview */}
      {imageURL && (
        <Box sx={{ mt: 3 }}>
          <img src={imageURL} alt="Uploaded" className="image-upload-preview" />
        </Box>
      )}

      {/* Show a loading spinner while uploading */}
      {loading && <CircularProgress size={24} />}

      {/* Show success/failure message */}
      {message && (
        <Typography className="image-upload-message" variant="body1">
          {message}
        </Typography>
      )}

      {/* Show the description returned from the backend */}
      {description && (
        <Typography className="image-upload-description">
          <strong>Description:</strong> {description}
        </Typography>
      )}
    </Box>
  );
}

export default ImageUpload;
