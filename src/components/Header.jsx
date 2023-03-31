import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// MUI Components
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// App Specific
import { env } from '../services/environment';

function Header() {
  const rrNavigate = useNavigate();
  const rrLocation = useLocation();
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleHomeButton = () => {
    if (rrLocation.pathname !== '/') {
      rrNavigate('/', { replace: true });
    } else {
      window.location.assign('https://openapps.co.za');
    }
  };

  const handleMenuToggle = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuRoutes = (e) => {
    handleMenuClose();
    rrNavigate(`/${e.currentTarget.dataset.name}`);
  };

  return (
    <AppBar color="inherit">
      <Container maxWidth="sm" disableGutters={smallScreen}>
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="home button"
            onClick={handleHomeButton}
          >{rrLocation.pathname === '/' ? <HomeIcon /> : <ArrowBackIcon />}</IconButton>
          <Typography variant="h6" sx={{ ml: 1, flexGrow: 1 }}
          >SmartSHOPPER{smallScreen ? null : (
            <span style={{ fontSize: 12 }}> v{env.VERSION}</span>)}</Typography>
          {rrLocation.pathname === '/' ? (
            <Box display="flex" flexDirection="row">
              <IconButton
                color="inherit"
                onClick={() => { rrNavigate('/edit/new') }}
              ><AddCircleIcon /></IconButton>
              <IconButton
                color="inherit"
                onClick={() => { rrNavigate('/settings') }}
              ><SettingsIcon /></IconButton>
              <IconButton
                color="inherit"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuToggle}
              ><MenuIcon /></IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuRoutes} data-name='settings'>Settings</MenuItem>
                <MenuItem onClick={handleMenuRoutes} data-name='download'>Backup Data</MenuItem>
                <MenuItem onClick={handleMenuRoutes} data-name='upload'>Restore Data</MenuItem>
              </Menu>
            </Box>
          ) : (null)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;