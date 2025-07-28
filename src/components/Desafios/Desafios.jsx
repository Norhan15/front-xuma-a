import {
  Box, Typography, IconButton, Grid, Card, CardMedia, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, FormControl, InputLabel, Select, MenuItem, Pagination
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Desafios = () => {
  // Sample data for the "Desafíos" table
  const desafios = [
    { id: 1, titulo: 'Reciclado', contenido: 'lorem ipsum', fechaInicio: '17/07/2025', fechaFin: '17/08/2025', finalizados: '5 usuarios' },
    { id: 2, titulo: 'Reciclado', contenido: 'lorem ipsum', fechaInicio: '17/07/2025', fechaFin: '17/08/2025', finalizados: '5 usuarios' },
    { id: 3, titulo: 'Reciclado', contenido: 'lorem ipsum', fechaInicio: '17/07/2025', fechaFin: '17/08/2025', finalizados: '5 usuarios' },
    { id: 4, titulo: 'Reciclado', contenido: 'lorem ipsum', fechaInicio: '17/07/2025', fechaFin: '17/08/2025', finalizados: '5 usuarios' },
    { id: 5, titulo: 'Reciclado', contenido: 'lorem ipsum', fechaInicio: '17/07/2025', fechaFin: '17/08/2025', finalizados: '5 usuarios' },
    { id: 6, titulo: 'Reciclado', contenido: 'lorem ipsum', fechaInicio: '17/07/2025', fechaFin: '17/08/2025', finalizados: '5 usuarios' },
  ];

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
          Desafíos
        </Typography>
        {/* Notification button in the top-right corner */}
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

      {/* Section with "Crear" button, "Aprobar Desafíos" button, and "Todo público" filter */}
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
        {/* "Crear" button */}
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

        {/* Right-aligned group for "Aprobar Desafíos" and "Todo público" */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* "Aprobar Desafíos" button */}
          <Button
            variant="outlined" // Changed to outlined as per image
            sx={{
              borderColor: '#399649', // Green border
              color: '#399649', // Green text
              '&:hover': {
                backgroundColor: '#e0ffe0', // Light green background on hover
                borderColor: '#2e7d3e', // Darker green border on hover
              },
              padding: '10px 20px',
            }}
          >
            Aprobar Desafíos
          </Button>

          {/* "Todo público" filter (Dropdown) */}
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value="todo_publico"
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
              <MenuItem value="todo_publico">Todo público</MenuItem>
              <MenuItem value="publicado">Publicado</MenuItem>
              <MenuItem value="borrador">Borrador</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Desafíos Table */}
      <Box sx={{
        maxWidth: '1200px',
        mx: 'auto',
        mt: 4,
      }}>
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="desafios table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>Título</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>Contenido</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>Fecha Inicio</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>Fecha Fin</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }}>Finalizados</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#0B2023' }} align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {desafios.map((desafio) => (
                <TableRow
                  key={desafio.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {desafio.id}
                  </TableCell>
                  <TableCell sx={{ color: '#399649' }}>{desafio.titulo}</TableCell>
                  <TableCell>{desafio.contenido}</TableCell>
                  <TableCell>{desafio.fechaInicio}</TableCell>
                  <TableCell>{desafio.fechaFin}</TableCell>
                  <TableCell>{desafio.finalizados}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" sx={{ color: '#399649' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#FF0000' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <Pagination
            count={3}
            defaultPage={1}
            siblingCount={0}
            renderItem={(item) => (
              <Button
                component="a"
                href={`#page-${item.page}`}
                variant={item.selected ? 'contained' : 'outlined'}
                sx={{
                  margin: '0 8px',
                  minWidth: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: item.selected ? '#399649' : 'white',
                  color: item.selected ? 'white' : '#399649',
                  borderColor: '#399649',
                  '&:hover': {
                    backgroundColor: item.selected ? '#2e7d3e' : '#e0ffe0',
                    borderColor: '#2e7d3e',
                  }
                }}
              >
                {item.page}
              </Button>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Desafios;