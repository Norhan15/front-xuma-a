import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

export const DetailDialog = ({ 
  open, 
  onClose, 
  tip 
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>{tip?.title}</DialogTitle>
    <DialogContent dividers>
      <Typography variant="body1">
        {tip?.description}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" variant="contained">
        Cerrar
      </Button>
    </DialogActions>
  </Dialog>
);