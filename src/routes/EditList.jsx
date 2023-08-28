import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

// MUI Icons
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

// App Specific
import { AppContext } from '../context/AppStore';
import { getItem } from '../services/utilities';

export default function EditList() {
  // const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const rrNavigate = useNavigate();
  // const refListNameInput = useRef(null);
  const refItemNameInput = useRef(null);
  const { listId } = useParams();
  const [{ db }] = useContext(AppContext);
  const lists = useLiveQuery(() => db.list.where('id').equals(listId ? parseInt(listId, 10) : 0).toArray(), [listId]);
  const items = useLiveQuery(() => db.item.where('listId').equals(listId ? parseInt(listId, 10) : 0).reverse().toArray(), [listId]);
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    console.log(lists);
    if (Array.isArray(lists)) {
      lists.length > 0 && setListName(lists[0].listName);
      // refListNameInput.current.focus();
    }
    return () => true;
  }, [lists]);

  const handleListEditButton = (e) => {
    e.preventDefault();
    if (listName !== '') {
      db.list.update(parseInt(listId, 10), { listName: listName.trim() })
        .then(id => { });
    }
  };

  const handleListDeleteButton = async () => {
    if (items.length > 0) {
      await db.item
        .where('listId').equals(parseInt(listId, 10))
        .delete();
    }
    await db.list.delete(parseInt(listId, 10));
    rrNavigate(-1);
  };

  const handleItemEditButtons = (e, action) => {
    e.preventDefault();
    if (refItemNameInput.current.value !== '') {
      // Save action
      if (itemId > 0) {
        db.item.update(itemId, { itemName: itemName.trim() })
          .then(id => {
            setItemName('');
            setItemId(0);
          });
      }
      // New action
      if (itemId === 0 && action === 'submit') {
        db.item.add({ listId: parseInt(listId, 10), itemName: itemName.trim(), done: false })
          .then(id => {
            setItemName('');
            setItemId(0);
            refItemNameInput.current.focus()
          });
      }
      // Clear action
      if (action === 'clear') {
        setItemName('');
        setItemId(0);
        refItemNameInput.current.focus()
      }
    }
  };

  const handleItemActionButtons = (action, id) => {
    // console.log(action, id);
    // Edit action
    if (action === 'edit') {
      setItemId(id);
      setItemName(getItem(items, id)[0].itemName);
      refItemNameInput.current.focus();
    }
    // Delete action
    if (action === 'delete') {
      db.item.delete(id);
    }
  };

  return (
    <Container maxWidth="sm">
      <Toolbar />
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}>
          <TextField
            fullWidth
            label="List Name"
            value={listName}
            onChange={(e) => setListName(e.currentTarget.value)}
          />
          <IconButton
            sx={{ ml: 1 }}
            aria-label="save list name"
            onClick={(e) => handleListEditButton(e)}
          ><SaveIcon /></IconButton>
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => handleItemEditButtons(e, 'submit')}
        >
          <TextField
            inputRef={refItemNameInput}
            fullWidth
            label="Item Name"
            InputLabelProps={{ shrink: true }}
            value={itemName}
            onChange={(e) => setItemName(e.currentTarget.value)}
          />
          <IconButton
            sx={{ ml: 1 }}
            aria-label="update item name"
            onClick={(e) => handleItemEditButtons(e, 'submit')}
          ><SaveIcon /></IconButton>
          <IconButton
            aria-label="clear item name"
            onClick={(e) => handleItemEditButtons(e, 'clear')}
          ><ClearIcon /></IconButton>
        </Box>

        <Paper sx={{ mt: 1, px: 1 }}>
          {items && (
            <List disablePadding>
              {items.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    disablePadding
                    disableGutters
                    secondaryAction={
                      <>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleItemActionButtons('edit', parseInt(item.id))}
                        ><EditIcon /></IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleItemActionButtons('delete', parseInt(item.id))}
                        ><DeleteIcon /></IconButton>
                      </>
                    }>
                    <ListItemText primary={item.itemName} primaryTypographyProps={{ variant: 'h6' }} />
                  </ListItem>
                );
              })}
            </List>
          )}
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            color="warning"
            onClick={handleListDeleteButton}
          >DELETE ENTIRE LIST</Button>
          <Button
            sx={{ ml: 1 }}
            fullWidth
            variant="outlined"
            onClick={() => rrNavigate(-1)}
          >BACK TO HOME PAGE</Button>
        </Box>
      </Box>
    </Container>
  );
}

