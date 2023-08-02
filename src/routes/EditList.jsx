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
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';

// App Specific
import { AppContext } from '../context/AppStore';
import { getItem } from '../services/utilities';

function EditList() {
  // const smallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const rrNavigate = useNavigate();
  const refInputField = useRef(null);
  const { listId } = useParams();
  const [{ db }] = useContext(AppContext);
  const lists = useLiveQuery(() => db.list.where('id').equals(listId ? Number(listId) : 0).toArray(), [listId]);
  const items = useLiveQuery(() => db.item.where('listId').equals(listId ? Number(listId) : 0).toArray(), [listId]);
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    lists && setListName(lists[0].listName);
    return () => true;
  }, [lists])

  const handleEditActionButtons = (e) => {
    e.preventDefault();

    if (refInputField.current.value !== '') {
      // Save action
      if (itemId > 0) {
        // Update existing item here
        db.item.update(itemId, { itemName: itemName.trim() })
          .then(id => { });
      }
      // New action
      if (itemId === 0) {
        // Add new item here
        db.item.add({ listId: Number(listId), itemName: itemName.trim(), done: false })
          .then(id => { refInputField.current.focus() });
      }
      // Clean-up
      setItemName('');
      setItemId(0);

      // // Submit action
      // if (action === 'submit') {
      //   if (itemId > 0) {
      //     // Update existing item here
      //     db.item.update(itemId, { itemName: trim(itemName) })
      //       .then(updated => {
      //         console.log('Updated ', updated)
      //         setItemName('');
      //         setItemId(0);
      //       });
      //   } else {
      //     // Add new item here
      //     db.item.add({ listId: Number(listId), itemName: trim(itemName), done: false })
      //       .then(added => {
      //         console.log('Added ', added)
      //         setItemName('');
      //         setItemId(0);
      //         refInputField.current.focus();
      //       });
      //   }
      // }
    }
  };

  const handleItemActionButtons = (action, id) => {
    console.log(action, id);
    // Edit action
    setItemId(id);
    setItemName(getItem(items, id)[0].itemName);
    refInputField.current.focus();

    // Delete action
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
            onClick={(e) => { }}
          ><SaveIcon /></IconButton>
        </Box>
        <Paper sx={{ mt: 1, padding: 1 }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 1 }}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => handleEditActionButtons(e)}
          >
            <TextField
              inputRef={refInputField}
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.currentTarget.value)}
            />
            <IconButton
              sx={{ ml: 1 }}
              aria-label="update item name"
              onClick={(e) => handleEditActionButtons(e)}
            ><SaveIcon /></IconButton>
            {/* <IconButton
              aria-label="create new item"
              onClick={(e) => handleEditActionButtons(e, 'new')}
            ><Add /></IconButton> */}
          </Box>

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

export default EditList;