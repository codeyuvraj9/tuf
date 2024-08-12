import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, FormControl, FormLabel, Checkbox, TextField, Snackbar, Alert } from '@mui/material';
import Banner from './Banner'

const Dashboard = () => {
  //snackbar for success and error messages
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  //Code for setting Banner, Dashboard part
  const [settings, setSettings] = useState({
    isVisible: false,
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
    axios.post(`${window.location.origin}/api/updatebanner`, settings)
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
      const response = await axios.get(`${window.location.origin}/api/getbanner`);
      setSettings(response.data);
    } catch (error) {
      console.error('There was an error fetching the banner settings!', error);
    }
  };

  useEffect(() => {
    fetchBannerSettings();
  }, []);

  return (
    <>
      <Banner />

      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h2">
          Welcome to the Website
        </Typography>
        <Typography variant="h6">
          After Submitting the form, reload to reflect any changes in banner state
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 400, margin: 'auto', padding: '16px', boxShadow: 3, borderRadius: '8px' }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Dashboard
        </Typography>
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

          <Button variant="contained" color="primary" type="submit" fullWidth >
            Update Banner
          </Button>
        </form>

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