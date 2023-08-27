import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

// App Specific
import { AppContext } from '../context/AppStore';

export default function NewList() {
  const rrNavigate = useNavigate();
  const refListNameInput = useRef(null);
  const refItemNameInput = useRef(null);
  const [{ db }] = useContext(AppContext);
  const [listId, setListId] = useState(0);
  const [items, setItems] = useState([]);
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    refListNameInput.current.focus();
    return () => true;
  }, []);

  useEffect(() => {
    refItemNameInput.current.focus();
    return () => true;
  }, [listId]);

  const handleListSubmit = (e) => {
    e.preventDefault();
    if (listName.length > 0) {
      if (listId > 0) {
        db.list.update(listId, { listName: listName.trim() })
          .then(currentListId => { });
      } else {
        db.list.add({ listName: listName, inUse: true, listOrder: 1 })
          .then(newListId => {
            setListId(parseInt(newListId, 10));
            console.log('set focus to item');
            refItemNameInput.current.focus();
          });
      }
    }
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    if (refItemNameInput.current.value !== '') {
      db.item.add({ listId: listId, itemName: itemName.trim(), done: false })
        .then(newItemId => {
          setItems(prevState => {
            let a = prevState;
            a.unshift({ itemName: itemName });
            return a;
          });
          setItemName('');
          refItemNameInput.current.focus();
        });
    }
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
          color={listId > 0 ? 'default' : 'warning'}
          aria-label="save new list"
          onClick={e => handleListSubmit(e)}
        ><SaveIcon /></IconButton>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}
        area-aria-label="create new item form"
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={e => handleItemSubmit(e)}
      >
        <TextField
          aria-label="new item name input"
          inputRef={refItemNameInput}
          fullWidth
          InputLabelProps={{ shrink: true }}
          disabled={listId === 0}
          label="Item Name"
          value={itemName}
          onChange={e => setItemName(e.currentTarget.value)}
        />
        <IconButton
          sx={{ ml: 1 }}
          aria-label="new item save"
          disabled={listId === 0}
          onClick={e => handleItemSubmit(e)}
        ><SaveIcon /></IconButton>
      </Box>

      <Paper sx={{ mt: 1, padding: 1 }}>
        {items.length > 0 && (
          <List>
            {items.map((item, index) => {
              return (
                <ListItem key={index} >
                  <ListItemText primary={item.itemName} />
                </ListItem>
              );
            })}
          </List>
        )}
      </Paper>
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
        <Button
          area-label="back button"
          fullWidth
          variant="outlined"
          onClick={() => rrNavigate(-1)}
        >BACK TO HOME PAGE</Button>
        {/* <Button fullWidth variant="outlined" sx={{ ml: 1 }} onClick={() => true}>Save</Button> */}
      </Box>
    </Container>
  );
}

