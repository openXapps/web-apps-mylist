import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// MUI Components
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import Box from '@mui/material/Box';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';

// MUI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import MenuIcon from '@mui/icons-material/Menu';
// import SettingsIcon from '@mui/icons-material/Settings';

// App Specific
import { AppContext } from '../context/AppStore';
import { env } from '../services/environment';

function Header() {
  const rrNavigate = useNavigate();
  const { pathname } = useLocation();
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const [{ routePath }, appDispatch] = useContext(AppContext);
  // const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (pathname === '/' && routePath !== env.NAME) {
      appDispatch({ type: 'ROUTE', payload: env.NAME });
    }
    return () => true;
  }, [pathname, appDispatch, routePath])

  // const handleMenuToggle = (e) => {
  //   setAnchorEl(e.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleMenuRoutes = (e) => {
  //   handleMenuClose();
  //   rrNavigate(`/${e.currentTarget.dataset.name}`);
  // };

  return (
    <AppBar color="inherit">
      <Container maxWidth="sm">
        <Toolbar disableGutters variant={smallScreen ? 'dense' : 'regular'}>
          {pathname !== '/' && (
            <IconButton
              sx={{ mr: 1 }}
              aria-label="back button"
              color="inherit"
              // onClick={() => rrNavigate('/', { replace: true })}
              onClick={() => rrNavigate(-1)}
            ><ArrowBackIcon /></IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {routePath}{!smallScreen && pathname === '/' && <span style={{ fontSize: 12 }}> v{env.VERSION}</span>}
          </Typography>
          {pathname === '/' ? (
            // <Box display="flex" flexDirection="row">
            <IconButton
              color="inherit"
              onClick={() => { rrNavigate('/new') }}
            ><AddCircleIcon /></IconButton>
            // <IconButton
            //   color="inherit"
            //   onClick={() => { rrNavigate('/settings') }}
            // ><SettingsIcon /></IconButton>
            // <IconButton
            //   color="inherit"
            //   aria-controls="menu-appbar"
            //   aria-haspopup="true"
            //   onClick={handleMenuToggle}
            // ><MenuIcon /></IconButton>
            // <Menu
            //   id="menu-appbar"
            //   anchorEl={anchorEl}
            //   anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
            //   transformOrigin={{ vertical: 'top', horizontal: 'right', }}
            //   keepMounted
            //   open={Boolean(anchorEl)}
            //   onClose={handleMenuClose}
            // >
            //   <MenuItem onClick={handleMenuRoutes} data-name='settings'>Settings</MenuItem>
            //   <MenuItem onClick={handleMenuRoutes} data-name='download'>Backup Data</MenuItem>
            //   <MenuItem onClick={handleMenuRoutes} data-name='upload'>Restore Data</MenuItem>
            // </Menu>
            // </Box>
          ) : (null)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;