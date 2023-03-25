import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';

// MUI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

// App Specific
import { AppContext } from '../context/AppStore';

// Remove this mock later when IndexedDB is active
import { initShoppingLists } from '../services/initload';

function ListContainer() {
  const [{ db }, _] = useContext(AppContext);
  const lists = useLiveQuery(() => db.list);
  const items = useLiveQuery(() => db.item);
  const rrNavigate = useNavigate();
  const [shoppingLists, setShoppingLists] = useState(initShoppingLists);

  console.log(db);
  console.log(lists);
  console.log(items);

  const handleItemClick = (e) => {
    let newLists = shoppingLists.map(v => v);
    let listId = Number(e.currentTarget.dataset.listId);
    let itemId = Number(e.currentTarget.dataset.itemId);
    newLists[listId].items[itemId].done = !newLists[listId].items[itemId].done;
    setShoppingLists(newLists);
  };

  const handleShowHideListClick = (e) => {
    let newLists = shoppingLists.map(v => v);
    let listId = Number(e.currentTarget.dataset.listId);
    newLists[listId].inUse = !newLists[listId].inUse;
    setShoppingLists(newLists);
  };

  const handleResetListClick = (e) => {
    let newLists = shoppingLists.map(v => v);
    let listId = Number(e.currentTarget.dataset.listId);
    newLists[listId].items = shoppingLists[listId].items.map(v => {
      return { ...v, done: false };
    });
    setShoppingLists(newLists);
  };

  return (
    <>
      {
        shoppingLists.map((list, listIndex) => {
          let a = list.items.length;
          return (
            <Box key={list.id} sx={{ mt: 1 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography
                // variant="body1"
                >{`${list.name} (${shoppingLists[listIndex].items.filter(e => e.done).length}/${a})`}</Typography>
                <Box>
                  <IconButton data-list-id={listIndex} onClick={handleResetListClick}><RestartAltIcon /></IconButton>
                  <IconButton
                    data-list-id={listIndex}
                    onClick={handleShowHideListClick}
                  >{list.inUse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
                  <IconButton onClick={() => rrNavigate('/edit')}><EditIcon /></IconButton>
                </Box>
              </Stack>
              {list.inUse && (
                <List sx={{ mt: 1, bgcolor: 'background.paper' }}>
                  {shoppingLists[listIndex].items.map((item, itemIndex) => {
                    return (
                      <Stack key={item.id} direction="row">
                        <IconButton
                          href={"https://www.google.com/search?q=" + item.value + "+price&safe=active&source=lnms&tbm=shop"}
                          target="_blank"
                          rel="noopener"
                        ><PriceCheckIcon /></IconButton>
                        <ListItem disableGutters disablePadding>
                          <ListItemButton onClick={handleItemClick} data-list-id={listIndex} data-item-id={itemIndex}>
                            <ListItemText primary={item.value} />
                            {item.done && <CheckIcon />}
                          </ListItemButton>
                        </ListItem>
                      </Stack>
                    );
                  })}
                </List>
              )}
            </Box>
          );
        })}
    </>
  );
}

export default ListContainer;