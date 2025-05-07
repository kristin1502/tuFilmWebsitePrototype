import React from 'react';
import logo from './tufilm_logo_blau_without_text.png'
import { Typography, useTheme, Box, Stack } from '@mui/material';

const Logo = () => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box
        component="img"
        src={logo}
        alt="TU Film Logo"
        sx={{ height: '3em', width: 'auto'}}
      />
      <Typography component="span" fontWeight="700" fontSize="1.7em">
        der tu<span style={{ color: theme.palette.primary.main }}>film</span>
      </Typography>
    </Stack>
  );
};

export default Logo;