import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Send from '@mui/icons-material/Send';

function ListContainer() {
  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">My shopping list</Typography>
        <Box>
          <IconButton><Delete /></IconButton>
          <IconButton><Send /></IconButton>
          <IconButton><Edit /></IconButton>
        </Box>
      </Stack>
      <List>
        <ListItem disableGutters>
          <ListItemText>Bread</ListItemText>
          <IconButton><Delete /></IconButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText>Milk</ListItemText>
          <IconButton><Delete /></IconButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText>Carrets</ListItemText>
          <IconButton><Delete /></IconButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemText>Washing liquid</ListItemText>
          <IconButton><Delete /></IconButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default ListContainer;