import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@mui/icons-material/Check';

const initShoppingLists = [
  {
    id: '1',
    name: 'Weekly food shopping',
    inUse: true,
    items: [
      { id: '1.1', value: 'Bread', done: false },
      { id: '1.2', value: 'Milk', done: false },
      { id: '1.3', value: 'Carrots', done: false },
      { id: '1.4', value: 'Apples', done: true },
      { id: '1.5', value: 'Meat', done: false },
    ]
  },
  {
    id: '2',
    name: 'Hardware store',
    inUse: true,
    items: [
      { id: '2.1', value: 'Hammer', done: false },
      { id: '2.2', value: 'Generator', done: false },
      { id: '2.3', value: 'Paint', done: false },
      { id: '2.4', value: 'Paint brushes', done: false },
    ]
  }
];

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
                  <IconButton>{list.inUse ? <KeyboardArrowDownIcon /> : <KeyboardArrowUp />}</IconButton>
                  <IconButton><Edit /></IconButton>
                </Box>
              </Stack>
              {list.inUse && (
                <List sx={{ mt: 1, bgcolor: 'background.paper' }}>
                  {shoppingLists[listIndex].items.map((item, itemIndex) => {
                    return (
                      <ListItem key={item.id} disableGutters disablePadding>
                        <ListItemButton onClick={handleItemClick} data-list-id={listIndex} data-item-id={itemIndex}>
                          <ListItemText primary={item.value} primaryTypographyProps={{ 'data-list-id': listIndex, 'data-item-id': itemIndex }} />
                          {item.done && (
                            <CheckIcon data-list-id={listIndex} data-item-id={itemIndex} />
                          )}
                        </ListItemButton>
                      </ListItem>
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