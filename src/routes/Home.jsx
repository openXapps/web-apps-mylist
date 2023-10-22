import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import List from '../components/ListContainer';
import BottomSpacer from '../components/BottomSpacer';

function Home() {
  return (
    <Container maxWidth="sm">
      <Toolbar />
      <List />
      <BottomSpacer />
    </Container>
  );
}

export default Home;