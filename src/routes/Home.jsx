import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import List from '../components/ListContainer';

function Home() {
  return (
    <Container maxWidth="sm">
      <Toolbar />
      <List />
    </Container>
  );
}

export default Home;