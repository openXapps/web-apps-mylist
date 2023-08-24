import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
// import { emptyList } from '../services/dbops';
// import { getItem } from '../services/utilities';

// Init store

export default function NewList() {
  const rrNavigate = useNavigate();
  const refListNameInput = useRef(null);
  const refItemNameInput = useRef(null);
  const [{ db }] = useContext(AppContext);
  const [listId, setListId] = useState(0);
  const [isListSaved, setIsListSaved] = useState(false);
  // const [list, setList] = useState(emptyList);
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    refListNameInput.current.focus();
    return () => true;
  }, []);

  // const handleListChange = (data, action) => {
  // console.log(data, action);
  //   if (action === 'LIST_NAME') setListName(prevState => {
  //     return { ...prevState, listName: data };
  //   });
  // }

  const handleListSubmit = (e) => {
    e.preventDefault();
    if (listName.length > 0) {
      if (isListSaved && listId) {
        db.list.update(listId, { listName: listName.trim() })
          .then(currentListId => { });
      } else {
        db.list.add({ listName: listName, inUse: true, listOrder: 1 })
          .then(newListId => {
            setItemName(newListId);
            setListId(parseInt(newListId, 10));
            refItemNameInput.current.focus();
            setIsListSaved(true);
          });
      }
    }
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    if (refItemNameInput.current.value !== '') {
      // Save action
      // if (itemId > 0) {
      //   db.item.update(itemId, { itemName: itemName.trim() })
      //     .then(id => {
      //       setItemName('');
      //       setItemId(0);
      //     });
      // }
      // New action
      // if (itemId === 0 && action === 'submit') {
      //   db.item.add({ listId: parseInt(listId, 10), itemName: itemName.trim(), done: false })
      //     .then(id => {
      //       setItemName('');
      //       setItemId(0);
      //       // refInputField.current.focus()
      //     });
    }
  };

  const handleItemDeleteButton = (id) => {
    // setItemId(id);
    // setItemName(getItem(items, id)[0].itemName);
    // refInputField.current.focus();
  };

  return (
    <Container maxWidth="sm">
      <Toolbar />
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={e => handleListSubmit(e)}
      >
        <TextField
          inputRef={refListNameInput}
          fullWidth
          label="List Name"
          value={listName}
          onChange={e => setListName(e.currentTarget.value)}
        />
        <IconButton
          sx={{ ml: 1 }}
          color={isListSaved ? 'default' : 'warning'}
          aria-label="save new list"
          onClick={e => handleListSubmit(e)}
        ><SaveIcon /></IconButton>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={e => handleItemSubmit(e)}
      >
        <TextField
          inputRef={refItemNameInput}
          fullWidth
          disabled={!isListSaved}
          label="Item Name"
          InputLabelProps={{ shrink: true }}
          value={itemName}
          onChange={e => setItemName(e.currentTarget.value)}
        />
        <IconButton
          sx={{ ml: 1 }}
          aria-label="save new item"
          disabled={!isListSaved}
          onClick={e => handleItemSubmit(e)}
        ><SaveIcon /></IconButton>
      </Box>

      <Paper sx={{ mt: 1, padding: 1 }}>
        {/* {items && (
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
          )} */}
      </Paper>
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
        <Button fullWidth variant="outlined" onClick={() => rrNavigate(-1)}>BACK TO HOME PAGE</Button>
        {/* <Button fullWidth variant="outlined" sx={{ ml: 1 }} onClick={() => true}>Save</Button> */}
      </Box>
    </Container>
  );
}

