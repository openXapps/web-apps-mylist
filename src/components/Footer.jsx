import { useNavigate, useLocation } from 'react-router-dom';

// MUI Components
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Footer() {
  const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const rrNavigate = useNavigate();
  const rrLocation = useLocation();

  return (
    <AppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0 }}>
      <Container maxWidth="sm" disableGutters={smallScreen}>
        <Toolbar disableGutters variant={smallScreen ? 'dense' : 'regular'}>
          {rrLocation.pathname !== '/' && <IconButton
            color="inherit"
            aria-label="home button"
            onClick={() => rrNavigate(-1)}
          ><ArrowBackIcon /></IconButton>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
