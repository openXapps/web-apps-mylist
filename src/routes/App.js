import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { env } from '../services/environment';

function App() {

  return (
    <Container>
      <Typography variant="h4">App Home {env.VERSION}</Typography>
    </Container>
  );
}

export default App;
