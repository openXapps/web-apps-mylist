import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

// MUI Components
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

function Edit() {

  const rrNavigate = useNavigate();
  const rrPath = useLocation().pathname;
  const { listId } = useParams();
  // const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  useEffect(() => {
    console.log(rrPath);
    if (rrPath === '/edit/new') {
      // setEditMode('NEW');
      // setRouteHeader('Create New Password');
    }
    if (rrPath !== '/edit/' && listId) {
      // setEditMode('EDIT');
      // setRouteHeader('Edit Password');
    }

    return () => true;
  }, [rrPath, listId]);

  return (
    <Container maxWidth="sm">
      <Toolbar />
      <div>EDIT {listId}</div>
    </Container>
  );
}

export default Edit;