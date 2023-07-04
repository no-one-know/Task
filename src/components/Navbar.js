import React from 'react';
import { AppBar, Typography } from '@mui/material';
import { appBarStyles, typographyStyles } from './Styles';

export default function Navbar() {
  return (
    <AppBar position='static' sx={appBarStyles}>
        <Typography variant='h2' sx={typographyStyles}>
          Assignment Tracker
        </Typography>
    </AppBar>
  );
}
