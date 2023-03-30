import { useNavigate, useLocation } from 'react-router-dom';

// MUI Components
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

// import { env } from '../services/environment';

function Header() {
  const rrNavigate = useNavigate();
  const rrLocation = useLocation();

  return (
    <AppBar color="inherit">
      <Container maxWidth="sm">
        <Toolbar disableGutters>
          <IconButton color="inherit" aria-label="home button"
          >{rrLocation.pathname === '/' ? <HomeIcon /> : <ArrowBackIcon />}</IconButton>
          <Typography variant="h6" sx={{ ml: 1, flexGrow: 1 }}>SmartSHOPPER</Typography>
          <IconButton color="inherit" aria-label="add list button"><AddIcon /></IconButton>
          <IconButton color="inherit" aria-label="menu bar button"><MenuIcon /></IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;