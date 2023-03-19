import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Home from '@mui/icons-material/Home';
import Menu from '@mui/icons-material/Menu';
import Add from '@mui/icons-material/Add';

// import { env } from '../services/environment';

function Header() {
  return (
    <AppBar color="inherit">
      <Container maxWidth="sm">
        <Toolbar disableGutters>
          <IconButton color="inherit" aria-label="home button"><Home /></IconButton>
          <Typography variant="h6" sx={{ ml: 1, flexGrow: 1 }}>ShopIT</Typography>
          <IconButton color="inherit" aria-label="add list button"><Add /></IconButton>
          <IconButton color="inherit" aria-label="menu bar button"><Menu /></IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;