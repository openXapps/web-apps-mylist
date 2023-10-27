import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import Dexie from 'dexie';
import { useTheme } from '@mui/material/styles';

// MUI Components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// App Specific
import ListItemComponent from '../components/ListItemComponent';
import { AppContext } from '../context/AppStore';
import { listTypes } from '../services/dbops';

export default function ListContainer() {
  const [{ db }] = useContext(AppContext); // destructure db out of state
  const theme = useTheme();
  const lists = useLiveQuery(() => db.list.toArray(), []);
  const items = useLiveQuery(() => db.item.orderBy('itemOrder').toArray(), []);
  const rrNavigate = useNavigate();

  const handleItemClick = (itemId, state) => {
    db.item.update(itemId, { 'done': !state, itemOrder: !state ? 100 : 1 });
  };

  const handleShowHideListClick = (listId, state) => {
    db.list.update(listId, { 'inUse': !state });
  };

  const handleResetListClick = (listId) => {
    db.transaction("rw", db.item, () => {
      db.item.where('listId').equals(listId).modify({ done: false, itemOrder: 1 });
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
            <Typography variant="caption">{`${listTypes[list.listType].label}: (${countDone}/${countOf})`}</Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography noWrap color={list.inUse ? theme.palette.primary.main : theme.palette.text.disabled}>{list.listName}</Typography>
              <Box sx={{ display: 'flex', flexWrap: false }}>
                <IconButton onClick={() => handleResetListClick(list.id)}><RestartAltIcon /></IconButton>
                <IconButton
                  onClick={() => handleShowHideListClick(list.id, list.inUse)}
                >{list.inUse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</IconButton>
                <IconButton onClick={() => rrNavigate('/edit/' + list.id)}><EditIcon /></IconButton>
              </Box>
            </Stack>
            {list.inUse ? (items.map((item) => {
              const url = list.listType === 0
                ? ('https://www.google.com/search?q=' + item.itemName + '+price&safe=active&source=lnms&tbm=shop')
                : ('https://www.google.com/search?q=how to "' + item.itemName + '"&safe=active');
              return item.listId === list.id && (
                <ListItemComponent
                  key={item.id}
                  mode='HOME'
                  url={url}
                  itemId={item.id}
                  itemName={item.itemName}
                  itemDone={item.done}
                  handleItemClick={handleItemClick}
                />
              );
            })) : (<Divider />)}
          </Box>
        );
      })}
    </>
  );
}
