import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';

// MUI Components
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

// MUI Icons
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

// App Specific
import { AppContext } from '../context/AppStore';
import { getItem } from '../services/utilities';
import { listTypes, inputFieldProps } from '../services/dbops';
import ListItemComponent from '../components/ListItemComponent';

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
  const [listType, setListType] = useState(0);
  const [itemName, setItemName] = useState('');
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    if (Array.isArray(lists)) {
      if (lists.length > 0) {
        setListName(lists[0].listName);
        setListType(lists[0].listType);
      }
    }
    return () => true;
  }, [lists]);

  const handleListSaveButton = (e) => {
    e.preventDefault();
    if (listName !== '') {
      db.list.update(parseInt(listId, 10), {
        listName: listName.trim(),
        listType: parseInt(listType, 10)
      }
      ).then(id => { });
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
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}>
        <TextField
          fullWidth
          label="List Name"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={listName}
          onChange={e => {
            e.currentTarget.value.length <= inputFieldProps.listName.maxLength &&
              setListName(e.currentTarget.value)
          }}
        />
        <Select
          sx={{ ml: 0.5 }}
          size="small"
          value={listType}
          onChange={e => setListType(parseInt(e.target.value, 10))}
        >{listTypes.map(v => (
          <MenuItem key={v.value} value={v.value}>{v.label}</MenuItem>
        ))}
        </Select>
        <IconButton
          sx={{ ml: 1 }}
          aria-label="save list name"
          onClick={(e) => handleListSaveButton(e)}
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
          size="small"
          InputLabelProps={{ shrink: true }}
          value={itemName}
          onChange={(e) => {
            e.currentTarget.value.length <= inputFieldProps.itemName.maxLength &&
              setItemName(e.currentTarget.value)
          }}
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
      <Box sx={{ mt: 1 }}>
        {items && items.map(item => {
          return (
            <ListItemComponent
              key={item.id}
              mode='EDIT'
              url=''
              itemId={item.id}
              itemName={item.itemName}
              itemDone={item.done}
              handleItemClick={() => { }}
              handleItemActionButtons={handleItemActionButtons}
            />
          );
        })}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={handleListDeleteButton}
        >DELETE ENTIRE LIST</Button>
        <Button
          sx={{ ml: 1 }}
          fullWidth
          variant="outlined"
          onClick={() => rrNavigate(-1)}
        >BACK TO HOME PAGE</Button>
      </Box>
      <Toolbar />
    </Container >
  );
}

