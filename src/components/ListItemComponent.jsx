// MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import GoogleIcon from '@mui/icons-material/Google';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
      {mode === 'HOME' &&
        <IconButton href={url} target="_blank" rel="noopener"
        ><GoogleIcon color="disabled" /></IconButton>
      }
      <Button
        sx={{ flexGrow: 1, mx: 0.5 }}
        color="warning"
        disabled={itemDone}
        onClick={(e) => {
          e.preventDefault();
          handleItemClick(itemId, itemDone);
        }}
      >{itemName}</Button>
      {
        mode === 'HOME' &&
        <IconButton onClick={() => handleItemClick(itemId, itemDone)}
        >{itemDone ? <RestartAltIcon /> : <CheckIcon />}</IconButton>
      }
      {
        mode === 'EDIT' &&
        <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleItemActionButtons('delete', parseInt(itemId))}
          ><DeleteIcon /></IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => handleItemActionButtons('edit', parseInt(itemId))}
          ><EditIcon /></IconButton>
        </Box>
      }
    </Box >
  );
};
