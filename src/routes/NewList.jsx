import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useLiveQuery } from 'dexie-react-hooks';

// MUI Components
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

// MUI Icons
import SaveIcon from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Clear from '@mui/icons-material/Clear';

// App Specific
import { AppContext } from '../context/AppStore';
import { emptyList } from '../services/dbops';
import { getItem } from '../services/utilities';

// Init store

export default function NewList() {
  const rrNavigate = useNavigate();
  const refListNameInput = useRef(null);
  const refItemNameInput = useRef(null);
  const [{ db }] = useContext(AppContext);
  const [listId, setListId] = useState(0);
  const list = emptyList;

  useEffect(() => {
    refListNameInput.current.focus();
    return () => true;
  }, [])

  const handleListEditButton = (e) => {
    e.preventDefault();
  }

  const handleItemEditButtons = (e, action) => {
    e.preventDefault();
    if (refInputField.current.value !== '') {
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
            refInputField.current.focus()
          });
      }
      // Clear action
      if (action === 'clear') {
        setItemName('');
        setItemId(0);
        refInputField.current.focus()
      }
    }
  };

  const handleItemActionButtons = (action, id) => {
    // console.log(action, id);
    // Edit action
    if (action === 'edit') {
      setItemId(id);
      setItemName(getItem(items, id)[0].itemName);
      refInputField.current.focus();
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
            inputRef={refListNameInput}
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
          ><Clear /></IconButton>
        </Box>

        <Paper sx={{ mt: 1, padding: 1 }}>
          {items && (
            <List>
              {items.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    disableGutters
                    secondaryAction={
                      <>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleItemActionButtons('edit', parseInt(item.id))}
                        ><Edit /></IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleItemActionButtons('delete', parseInt(item.id))}
                        ><Delete /></IconButton>
                      </>
                    }>
                    <ListItemText primary={item.itemName} />
                  </ListItem>
                );
              })}
            </List>
          )}
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
          <Button fullWidth variant="outlined" onClick={() => rrNavigate(-1)}>BACK TO HOME PAGE</Button>
          {/* <Button fullWidth variant="outlined" sx={{ ml: 1 }} onClick={() => true}>Save</Button> */}
        </Box>
      </Box>
    </Container>
  );
}

