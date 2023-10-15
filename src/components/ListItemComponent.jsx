// MUI Components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import GoogleIcon from '@mui/icons-material/Google';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/**
 * React component to display list items on home page
 * @param {any} props Component properties
 * @returns React component
 */
export default function ListItemComponent(props) {
  const { 
    mode, 
    url, 
    itemId, 
    itemName, 
    itemDone, 
    handleItemClick,
    handleItemActionButtons,
  } = props;

  return (
    <Box sx={{
      width: '100%',
      display: 'inline-flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      p: 0.5, mt: 0.5,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
      borderRadius: 2,
    }}>
      {mode === 'HOME' && <IconButton
        href={url}
        target="_blank"
        rel="noopener"
      ><GoogleIcon color="disabled" /></IconButton>}
      <Typography
        sx={{
          flexGrow: 1,
          mx: 0.5,
          color: itemDone ? 'text.disabled' : 'text.primary'
        }}
        variant="h6"
      >{itemName}</Typography>
      {mode === 'HOME' && <IconButton onClick={() => handleItemClick(itemId, itemDone)}><CheckIcon /></IconButton>}
      {mode === 'EDIT' && <Box sx={{display: 'flex', flexWrap: 'nowrap'}}>
        <IconButton
          aria-label="delete"
          color="warning"
          onClick={() => handleItemActionButtons('delete', parseInt(itemId))}
        ><DeleteIcon /></IconButton>
        <IconButton
          aria-label="edit"
          onClick={() => handleItemActionButtons('edit', parseInt(itemId))}
        ><EditIcon /></IconButton>
      </Box>
      }
    </Box>
  );
};
