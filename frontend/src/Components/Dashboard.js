import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  Box, Typography, Button, FormControl, FormLabel, Checkbox,
  TextField, Snackbar, Alert
} from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [settings, setSettings] = useState({
    isVisible: true,
    description: '',
    timer: 0,
    link: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${window.process.env}/api/updatebanner`, settings)
      .then(response => {
        setSnackbar({
          open: true,
          message: 'Banner updated successfully',
          severity: 'success',
        });
      })
      .catch(error => {
        setSnackbar({
          open: true,
          message: error.response?.data.message || 'There was an error updating the banner.',
          severity: 'error',
        });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchBannerSettings = async () => {
    try {
      const response = await axios.get(`${window.process.env}/api/getbanner`);
      if (response.data) {
        setSettings(response.data);
      } else {
        console.log("No banner is found in database!");
      }
    } catch (error) {
      console.error('There was an error fetching the banner settings!', error);
    }
  };

  useEffect(() => {
    fetchBannerSettings();
  }, []);

  // Handle navigation to the Banner component
  const handleShowBanner = () => {
    navigate('/banner'); // Adjust the path to match your route setup
  };

  return (
    <>
      <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
        <Typography variant="h2">
          Set the Banner
        </Typography>
        
      </Box>
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: '16px', boxShadow: 3, borderRadius: '8px' }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <FormLabel>Banner On/Off
              <Checkbox
                name="isVisible"
                checked={settings.isVisible}
                onChange={handleChange}
                color="primary"
              />
            </FormLabel>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Banner Description"
              name="description"
              value={settings.description}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Banner Timer (seconds)"
              type="number"
              name="timer"
              value={settings.timer}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Banner Link"
              name="link"
              value={settings.link}
              onChange={handleChange}
              variant="outlined"
            />
          </FormControl>

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ marginBottom: "10px" }}>
            Update Banner
          </Button>
        </form>
        <Button variant="contained" color="success" fullWidth onClick={handleShowBanner}>
          Show Banner Content
        </Button>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Dashboard;
