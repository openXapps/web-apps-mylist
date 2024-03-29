import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import Dexie from 'dexie';

// MUI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';
import GoogleIcon from '@mui/icons-material/Google';

// App Specific
import ItemHome from '../components/ItemHome';
import { AppContext } from '../context/AppStore';
import { listTypes } from '../services/dbops';

function ListContainer() {
  const [{ db }] = useContext(AppContext); // destructure db out of state
  const lists = useLiveQuery(() => db.list.toArray(), []);
  const items = useLiveQuery(() => db.item.toArray(), []);
  const rrNavigate = useNavigate();

  const handleItemClick = (itemId, state) => {
    db.item.update(itemId, { 'done': !state });
  };

  const handleShowHideListClick = (listId, state) => {
    db.list.update(listId, { 'inUse': !state });
  };

  const handleResetListClick = (listId) => {
    db.transaction("rw", db.item, () => {
      db.item.where('listId').equals(listId).modify({ done: false });
    }).catch(Dexie.ModifyError, error => {
      console.error(error.failures.length + ' items failed to modify');
    }).catch(error => {
      console.error('Generic error: ' + error);
    });
  };

  return lists && items && (
    <>
      {lists.map((list) => {
        let countDone = items.filter(e => e.listId === list.id && e.done).length;
        let countOf = items.filter(e => e.listId === list.id).length;
        return (
          <Box key={list.id} sx={{ mt: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography>{`${listTypes[list.listType].label}: ${list.listName} (${countDone}/${countOf})`}</Typography>
              <Box sx={{ display: 'flex', flexWrap: false }}>
                <IconButton onClick={() => handleResetListClick(list.id)}><RestartAltIcon /></IconButton>
                <IconButton
                  onClick={() => handleShowHideListClick(list.id, list.inUse)}
                >{list.inUse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
                <IconButton onClick={() => rrNavigate('/edit/' + list.id)}><EditIcon /></IconButton>
              </Box>
            </Stack>
            {list.inUse ? (
              // <List sx={{ mt: 1, bgcolor: 'background.paper' }} disablePadding>
                {items.map((item) => {
                  const url = list.listType === 0
                    ? ('https://www.google.com/search?q=' + item.itemName + '+price&safe=active&source=lnms&tbm=shop')
                    : ('https://www.google.com/search?q=how to "' + item.itemName + '"&safe=active');
                  return item.listId === list.id && (
                    <ItemHome key={item.id}  url={url} itemName={item.itemName} />
                    //   <Stack key={item.id} direction="row" alignItems="center">
                    //     <IconButton
                    //       href={url}
                    //       target="_blank"
                    //       rel="noopener"
                    //     ><GoogleIcon color="disabled" /></IconButton>
                    //     <ListItem disableGutters disablePadding>
                    //       <ListItemButton onClick={() => handleItemClick(item.id, item.done)}>
                    //         <ListItemText primary={item.itemName} primaryTypographyProps={{ variant: 'h6' }} />
                    //         <Box ml={1}><CheckIcon color={item.done ? 'warning' : 'disabled'} /></Box>
                    //       </ListItemButton>
                    //     </ListItem>
                    //   </Stack>
                  );
                })}
              // </List>
            ) : (<Divider />)}
          </Box>
        );
      })}
    </>
  );
}

export default ListContainer;