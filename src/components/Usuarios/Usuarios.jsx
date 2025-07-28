import {
  Box, Typography, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, FormControl, Select, MenuItem, Pagination, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser } from '../../services/userService';

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const fetchUsersData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      const formattedUsers = data.map(user => ({
        id: user.id,
        nombres: user.Nombres || 'N/A',
        apellidos: user.Apellidos || 'N/A',
        edad: user.Edad || 'N/A',
        correo: user.correo || 'N/A',
        status: user.Status || 'N/A',
        firstName: user.Nombres || '',
        lastName: user.Apellidos || '',
        age: user.Edad || 0,
      }));
      setUsers(formattedUsers);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  // Lógica de paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      const dataToUpdate = {
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        age: parseInt(editingUser.age, 10),
      };

      await updateUser(editingUser.id, dataToUpdate);
      setSnackbar({ open: true, message: 'Usuario actualizado exitosamente!', severity: 'success' });
      handleCloseEditDialog();
      fetchUsersData();
    } catch (err) {
      console.error('Error saving user:', err);
      setSnackbar({ open: true, message: `Error al actualizar usuario: ${err.message}`, severity: 'error' });
    }
  };

  const handleDeleteClick = (userId) => {
    setUserToDeleteId(userId);
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
    setUserToDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDeleteId) return;

    try {
      await deleteUser(userToDeleteId);
      setSnackbar({ open: true, message: 'Usuario eliminado exitosamente!', severity: 'success' });
      handleCloseDeleteConfirm();
      fetchUsersData();
      
      // Si la página actual queda vacía después de eliminar, retroceder una página
      if (currentUsers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setSnackbar({ open: true, message: `Error al eliminar usuario: ${err.message}`, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        backgroundColor: '#E9F1F2',
        p: 3,
        marginTop: { xs: '-64px', sm: 0 },
        width: '100%',
      }}
    >
      {/* Main Title centered and notification button */}
      <Box sx={{ textAlign: 'center', mb: 4, position: 'relative' }}>
        <Typography
          variant="h4"
          sx={{
            color: '#0B2023',
            fontWeight: 600,
            mb: 2
          }}
        >
          Usuarios
        </Typography>
        <IconButton
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          aria-label="notificaciones"
        >
          <NotificationsIcon fontSize="large" sx={{ color: '#399649' }} />
        </IconButton>
      </Box>

      {/* Section with "Crear" button and "Todos" filter */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        maxWidth: '1200px',
        mx: 'auto',
        flexWrap: 'wrap',
        gap: 2,
      }}>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          sx={{
            backgroundColor: '#399649',
            color: 'white',
            '&:hover': {
              backgroundColor: '#2e7d3e'
            },
            minWidth: '120px',
            padding: '10px 20px',
          }}
        >
          Crear
        </Button>

        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value="todos"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'transparent !important' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent !important' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent !important' },
              '.MuiSelect-select': { paddingRight: '32px !important' },
              '.MuiSvgIcon-root': { color: '#399649' },
            }}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* User Table */}
      <Box sx={{
        maxWidth: '1200px',
        mx: 'auto',
        mt: 4,
      }}>
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>Nombres</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>Apellidos</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>Edad</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>Correo</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }} align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress sx={{ color: '#399649' }} />
                    <Typography>Cargando usuarios...</Typography>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="error">Error: {error}</Typography>
                    <Typography>Please check your network or the API token.</Typography>
                  </TableCell>
                </TableRow>
              ) : currentUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography>No se encontraron usuarios.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                currentUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell sx={{ color: '#399649' }}>{user.nombres}</TableCell>
                    <TableCell>{user.apellidos}</TableCell>
                    <TableCell>{user.edad} años</TableCell>
                    <TableCell>{user.correo}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" sx={{ color: '#399649' }} onClick={() => handleEditClick(user)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#FF0000' }} onClick={() => handleDeleteClick(user.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {users.length > usersPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#399649',
                  borderColor: '#399649',
                  '&:hover': {
                    backgroundColor: '#e0ffe0',
                  },
                },
                '& .Mui-selected': {
                  backgroundColor: '#399649 !important',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#2e7d3e !important',
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent dividers>
          {editingUser && (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                label="Nombres"
                name="firstName"
                value={editingUser.firstName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Apellidos"
                name="lastName"
                value={editingUser.lastName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Edad"
                name="age"
                type="number"
                value={editingUser.age}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} sx={{ color: '#0B2023' }}>Cancelar</Button>
          <Button onClick={handleSaveEdit} variant="contained" sx={{ backgroundColor: '#399649', '&:hover': { backgroundColor: '#2e7d3e' } }}>
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            ¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} sx={{ color: '#0B2023' }}>Cancelar</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{ backgroundColor: '#FF0000', '&:hover': { backgroundColor: '#CC0000' } }}
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Usuarios;