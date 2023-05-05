import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';

// MUI Components
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

// App Specific
import { AppContext } from '../context/AppStore';

function Edit() {
  // const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  // const rrNavigate = useNavigate();
  const rrPath = useLocation().pathname;
  const { listId } = useParams();
  const [{ db }] = useContext(AppContext);
  // const [items, setItems] = useState([]);
  const itemQuery = useLiveQuery(() => db.item.where('listId').equals(listId ? Number(listId) : 0).toArray());

  useEffect(() => {
    console.log(rrPath);
    if (rrPath === '/edit/new') {
      // setEditMode('NEW');
      // setRouteHeader('Create New Password');
    }
    if (rrPath !== '/edit/' && listId) {
      // setEditMode('EDIT');
      // setRouteHeader('Edit Password');
      // setItems()
      console.log(itemQuery);
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