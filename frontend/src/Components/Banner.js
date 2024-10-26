import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Box,
    Typography,
    Button,
    Link as MUILink,
} from '@mui/material';

export default function Banner() {
    const [banner, setBanner] = React.useState({
        isVisible: 0,
        description: '',
        timer: 0,
        link: ''
    });
    const [countdown, setCountdown] = useState(10);

    const fetchBannerData = async () => {
        try {
            const response = await axios.get(`${window.process.env}/api/getbanner`);

            if (response) {
                const bannerData = {
                    isVisible: response.data.isVisible,
                    description: response.data.description,
                    timer: response.data.timer,
                    link: response.data.link
                };
                setBanner(bannerData);
                setCountdown(response.data.timer);
            }

        } catch (error) {
            console.error('There was an error fetching the banner details', error);
        }
    };

    useEffect(() => {
        fetchBannerData();
    }, []);

    useEffect(() => {
        if (banner.isVisible && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (countdown === 0 && banner.isVisible) {
            setBanner(prevBanner => ({
                ...prevBanner,
                isVisible: 0,
            }));
        }
    }, [banner.isVisible, countdown]);

    //Function to format the countdown time
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs > 0 ? hrs + "h " : ""}${mins > 0 ? mins + "m " : ""}${secs}s`;
    }

    return (
        <div>
            <Container sx={{ textAlign: 'center' }}>
                {banner.isVisible ? (
                    <Box sx={{ backgroundColor: '#F6AE9F', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                        <Typography variant="h5">
                            {banner.description}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            This banner will disappear in {formatTime(countdown)}
                        </Typography>
                        <MUILink href={banner.link} target="_blank" rel="noopener noreferrer" underline="none">
                            <Button variant="contained" color="primary">
                                Click here for details!
                            </Button>
                        </MUILink>
                    </Box>
                ) : (
                    <Typography variant="h6">
                        Banner Timed Out or Turned Off!
                    </Typography>
                )}
            </Container>
        </div>
    );
}
