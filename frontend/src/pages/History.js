import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

function History() {
  const [history, setHistory] = useState([]);

  // Fetch the history from the backend
  useEffect(() => {
    axios.get('http://localhost:5001/api/history')
      .then(response => {
        setHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching history:', error);
      });
  }, []);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Upload History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Upload Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                    <img src={`http://localhost:5001/uploads/${item.image_path.split('/').pop()}`} alt="Uploaded" style={{ width: '100px' }} />
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{new Date(item.upload_time).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default History;
