import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useLocalStorage } from '../../hooks/useLocalStorage';

export function ButtonAppBar() {
  const [accessToken] = useLocalStorage('accessToken');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/*<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>*/}
          {/*  <MenuIcon />*/}
          {/*</IconButton>*/}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">LinkORG</Link>
          </Typography>

          {!accessToken && (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
