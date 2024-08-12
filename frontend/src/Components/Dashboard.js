import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button, FormControl, FormLabel, Checkbox, TextField, 
} from '@mui/material';
import Banner from './Banner'

const Dashboard = () => {
  //Code for setting Banner, Dashboard part
  const [settings, setSettings] = useState({
    isVisible: false,
    description: '',
    timer: 0,
    link: ''
  });


  useEffect(() => {
    const fetchBannerSettings = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/getbanner`);
        setSettings(response.data);
      } catch (error) {
        console.error('There was an error fetching the banner settings!', error);
      }
    };

    fetchBannerSettings();
  }, []);


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
        alert('Banner updated successfully');
      })
      .catch(error => {
        console.error('There was an error updating the banner!', error);
      });
  };

  return (
    <>
      <Banner />
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h2">
          Welcome to the Website
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

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Update Banner
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Dashboard;
