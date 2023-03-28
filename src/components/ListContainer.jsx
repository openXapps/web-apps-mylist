import { useContext } from 'react';
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

function ListContainer() {
  const [{ db }] = useContext(AppContext); // destructure db out of state
  const lists = useLiveQuery(() => db.list.toArray(), []);
  const items = useLiveQuery(() => db.item.toArray(), []);
  const rrNavigate = useNavigate();

  console.log('Rendering...');
  // console.log(db);
  // lists && console.log('lists: ', lists);
  // items && console.log('items: ', items);

  const handleItemClick = (itemId, state) => {
    db.item.update(itemId, { 'done': !state });
  };

  const handleShowHideListClick = (listId, state) => {
    db.list.update(listId, { 'inUse': !state });
  };

  const handleResetListClick = (listId) => {
    console.log(listId);

    // let newLists = shoppingLists.map(v => v);
    // let listId = Number(e.currentTarget.dataset.listId);
    // newLists[listId].items = shoppingLists[listId].items.map(v => {
    //   return { ...v, done: false };
    // });
    // setShoppingLists(newLists);
  };

  return lists && items && (
    <>
      {lists.map((list) => {
        let countDone = items.filter(e => e.listId === list.id && e.done).length;
        let countOf = items.filter(e => e.listId === list.id).length;
        return (
          <Box key={list.id} sx={{ mt: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography>{`${list.listName} (${countDone}/${countOf})`}</Typography>
              <Box>
                <IconButton onClick={() => handleResetListClick(list.id)}><RestartAltIcon /></IconButton>
                <IconButton
                  onClick={() => handleShowHideListClick(list.id, list.inUse)}
                >{list.inUse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
                <IconButton onClick={() => rrNavigate('/edit')}><EditIcon /></IconButton>
              </Box>
            </Stack>
            {list.inUse && (
              <List sx={{ mt: 1, bgcolor: 'background.paper' }}>
                {items.map((item) => {
                  return item.listId === list.id && (
                    <Stack key={item.id} direction="row">
                      <IconButton
                        href={"https://www.google.com/search?q=" + item.itemName + "+price&safe=active&source=lnms&tbm=shop"}
                        target="_blank"
                        rel="noopener"
                      ><PriceCheckIcon /></IconButton>
                      <ListItem disableGutters disablePadding>
                        <ListItemButton onClick={() => handleItemClick(item.id, item.done)}>
                          <ListItemText primary={item.itemName} />
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