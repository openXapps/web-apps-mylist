import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';

// MUI Components
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// App Specific
import { AppContext } from '../context/AppStore';

function EditList() {
  // const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  // const rrNavigate = useNavigate();
  // const rrPath = useLocation().pathname;
  const { listId } = useParams();
  const [{ db }] = useContext(AppContext);
  const lists = useLiveQuery(() => db.list.where('id').equals(listId ? Number(listId) : 0).toArray(), [listId]);
  const items = useLiveQuery(() => db.item.where('listId').equals(listId ? Number(listId) : 0).toArray(), [listId]);
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    lists && setListName(lists[0].listName);
    return () => true;
  }, [lists])

  return (
    <Container maxWidth="sm">
      <Toolbar />
      <Box sx={{ mt: 2 }}>
        <TextField fullWidth label="List Name" value={listName} onChange={(e) => setListName(e.currentTarget.value)} />
        <Paper sx={{ mt: 1, padding: 1 }}>
          <TextField sx={{ mt: 1 }} fullWidth label="Edit Item" value={itemName} onChange={(e) => setItemName(e.currentTarget.value)} />
          {items && (
            <List>
              {items.map((item) => {
                return (
                  <Stack key={item.id} direction="row">
                    <ListItem disableGutters disablePadding>
                      <ListItemText primary={item.itemName} />
                    </ListItem>
                  </Stack>
                );
              })}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default EditList;