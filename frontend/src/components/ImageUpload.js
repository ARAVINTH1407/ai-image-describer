import React, { useState } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Box, Card, CardContent, Tooltip } from '@mui/material';
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
    setImageURL(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
      setDescription(res.data.description);
    } catch (err) {
      setMessage('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="image-upload-container">
      <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Upload and Describe an Image
          </Typography>
          <Tooltip title="Choose an image to upload and describe">
            <label htmlFor="image-upload" className="image-upload-label">
              Choose an Image
            </label>
          </Tooltip>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="image-upload-input"
            onChange={handleImageChange}
          />

          {imageURL && (
            <Box sx={{ mt: 3 }}>
              <img src={imageURL} alt="Uploaded" className="image-upload-preview" />
            </Box>
          )}

          {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}

          {message && (
            <Typography className="image-upload-message" variant="body1" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}

          {description && (
            <Typography className="image-upload-description" sx={{ mt: 2 }}>
              <strong>Description:</strong> {description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ImageUpload;
