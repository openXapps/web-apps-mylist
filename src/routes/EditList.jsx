import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';

// MUI Components
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

// MUI Icons
import SaveIcon from '@mui/icons-material/Save';

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
  const [editLock, setEditLock] = useState(true);

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
          {/* <Stack direction="row" spacing={1} alignItems="center"> */}
          <Box
            sx={{ display: editLock ? 'none': 'flex', flexDirection: 'row', alignItems: 'center', my: 1 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              disabled={editLock}
              label="Edit Item"
              value={itemName}
              onChange={(e) => setItemName(e.currentTarget.value)}
            />
            <IconButton
              sx={{ ml: 1 }}
              aria-label="save item"
              onClick={(e) => e.preventDefault()}
              type="submit"
              disabled={editLock}
            ><SaveIcon /></IconButton>
          </Box>
          {/* </Stack> */}
          {items && (
            <List>
              {items.map((item) => {
                return (
                  <ListItem key={item.id} disableGutters disablePadding>
                    <ListItemText primary={item.itemName} />
                  </ListItem>
                );
              })}
            </List>
          )}
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
          <Button fullWidth variant="outlined">Cancel</Button>
          <Button fullWidth sx={{ ml: 1 }} variant="outlined" onClick={() => setEditLock(false)}>Save</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditList;