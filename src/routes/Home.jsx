import Container from '@mui/material/Container';

import List from '../components/ListContainer';
import BottomSpacer from '../components/BottomSpacer';

function Home() {
  return (
    <Container maxWidth="sm">
      <List />
      <BottomSpacer />
    </Container>
  );
}

export default Home;