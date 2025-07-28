import {
  Menu,
  MenuItem
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export const ActionMenu = ({
  anchorEl,
  onClose,
  onEdit,
  onDelete
}) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
  >
    <MenuItem onClick={onEdit}>
      <EditIcon sx={{ mr: 1, color: '#2196f3' }} />
      Editar
    </MenuItem>
    <MenuItem onClick={onDelete}>
      <DeleteIcon sx={{ mr: 1, color: '#f44336' }} />
      Eliminar
    </MenuItem>
  </Menu>
);