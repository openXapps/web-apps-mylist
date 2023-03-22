import { useState } from 'react';

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
import CheckIcon from '@mui/icons-material/Check';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

// Remove this mock later when IndexedDB is active
import { initShoppingLists } from '../services/initload';

function ListContainer() {
  const [shoppingLists, setShoppingLists] = useState(initShoppingLists);

  const handleItemClick = (e) => {
    let newLists = shoppingLists.map(v => v);
    let listId = 0;
    let itemId = 0;
    if (e.target.dataset.listId && e.target.dataset.itemId) {
      listId = Number(e.target.dataset.listId);
      itemId = Number(e.target.dataset.itemId);
      newLists[listId].items[itemId].done = !newLists[listId].items[itemId].done;
      setShoppingLists(newLists);
    }
  };

  return (
    <>
      {
        shoppingLists.map((list, listIndex) => {
          let a = list.items.length;
          return (
            <Box key={list.id} sx={{ mt: 1 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="body1">{`${list.name} (${1}/${a})`}</Typography>
                <Box>
                  <IconButton>{list.inUse ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}</IconButton>
                  <IconButton><EditIcon /></IconButton>
                </Box>
              </Stack>
              {list.inUse && (
                <List sx={{ mt: 1, bgcolor: 'background.paper' }}>
                  {shoppingLists[listIndex].items.map((item, itemIndex) => {
                    return (
                      <Stack key={item.id} direction="row">
                      <IconButton href={"https://www.google.com/search?q=" + item.value + "+price&safe=active&source=lnms&tbm=shop"}><PriceCheckIcon /></IconButton>
                        <ListItem disableGutters disablePadding>
                          <ListItemButton onClick={handleItemClick} data-list-id={listIndex} data-item-id={itemIndex}>
                            <ListItemText primary={item.value} primaryTypographyProps={{ 'data-list-id': listIndex, 'data-item-id': itemIndex }} />
                            {item.done && (
                              <CheckIcon data-list-id={listIndex} data-item-id={itemIndex} />
                            )}
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