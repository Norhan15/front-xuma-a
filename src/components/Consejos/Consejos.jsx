import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Pagination,
  Grid,
  Menu,
  MenuItem
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useConsejosDiarios } from './useConsejosDiarios';
import { EditDialog } from '../Consejos/ConsejosModal/EditDialog';
import { DeleteDialog } from '../Consejos/ConsejosModal/DeleteDialog';
import { DetailDialog } from '../Consejos/ConsejosModal/DetailDialog';
import { AddDialog } from '../Consejos/ConsejosModal/AddDialog'; 

const ConsejosDiarios = () => {
  const {
    tips,
    loading,
    pagination,
    anchorEl,
    currentTip,
    openEditDialog,
    openDeleteDialog,
    openDetailDialog,
    selectedTipDetail,
    editForm,
    openAddDialog,
    addForm,
    handleAddClick,
    handleAddDialogClose,
    handleAddSubmit,
    handleAddFormChange,
    handlePageChange,
    handleMenuOpen,
    handleMenuClose,
    handleEditClick,
    handleDeleteClick,
    handleEditDialogClose,
    handleDeleteDialogClose,
    handleEditSubmit,
    handleDeleteConfirm,
    handleFormChange,
    handleClickOpenDetail,
    handleCloseDetailDialog
  } = useConsejosDiarios();

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: '#fffffff1',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '20px',
        justifyContent: 'center',
        marginTop: { xs: '10px', sm: 0 },
        px: { xs: 2, md: 14 }
      }}
    >
      {/* Header section */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto'
      }}>
        <Typography
          variant="h4"
          sx={{
            color: '#1e293b',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontSize: { xs: '1.8rem', sm: '2.2rem' }
          }}
        >
          Consejos Diarios
        </Typography>
        <IconButton
          sx={{
            backgroundColor: '#f1f5f9',
            color: '#1e293b',
            '&:hover': {
              backgroundColor: '#e2e8f0'
            }
          }}
          aria-label="notificaciones"
        >
          <NotificationsIcon fontSize="medium" sx={{ color: '#399649' }} />
        </IconButton>
      </Box>

      {/* Tips section */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mb: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          width: '100%'
        }}>
          <Typography
            variant="h5"
            sx={{
              color: '#399649',
              fontWeight: 600,
              fontSize: '1.4rem'
            }}
          >
            Tips de sostenibilidad
          </Typography>
         <Chip
          icon={<AddCircleIcon sx={{ color: '#fff !important' }} />}
          label="Nuevo"
          sx={{
            backgroundColor: '#399649',
            color: 'white',
            fontWeight: 500,
            px: 1,
            '& .MuiChip-icon': {
              marginLeft: '4px'
            }
          }}
          clickable
          onClick={handleAddClick} // Cambia esto
        />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <>
            <Grid container spacing={3} sx={{ width: '100%', mb: 4 }}>
              {tips.map((tip) => (
                <Grid item xs={12} key={tip.id}>
                  <Card
                    sx={{
                      width: '100%',
                      maxWidth: '800px',
                      margin: '0 auto',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 12px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardContent
                      sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '160px',
                        width: '250px',
                        cursor: 'pointer',
                        '&:after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          backgroundColor: '#399649',
                          borderBottomLeftRadius: '12px',
                          borderBottomRightRadius: '12px'
                        }
                      }}
                      onClick={() => handleClickOpenDetail(tip)}
                    >
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                      }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              color: '#1e293b',
                              fontWeight: 600,
                              mb: 1,
                              fontSize: '1.1rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {tip.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: '#334155',
                              lineHeight: '1.6',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {tip.description}
                          </Typography>
                        </Box>
                        <IconButton
                          aria-label="more"
                          aria-controls="tip-menu"
                          aria-haspopup="true"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuOpen(e, tip);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Menu de acciones */}
            <Menu
              id="tip-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEditClick}>
                <EditIcon sx={{ mr: 1 }} /> Editar
              </MenuItem>
              <MenuItem onClick={handleDeleteClick}>
                <DeleteIcon sx={{ mr: 1 }} /> Eliminar
              </MenuItem>
            </Menu>

            {/* Diálogos */}
            <EditDialog
              open={openEditDialog}
              onClose={handleEditDialogClose}
              onSubmit={handleEditSubmit}
              formData={editForm}
              onFormChange={handleFormChange}
            />

            <DeleteDialog
              open={openDeleteDialog}
              onClose={handleDeleteDialogClose}
              onConfirm={handleDeleteConfirm}
              tipTitle={currentTip?.title}
            />

            <DetailDialog
              open={openDetailDialog}
              onClose={handleCloseDetailDialog}
              tip={selectedTipDetail}
            />

              <AddDialog
                open={openAddDialog}
                onClose={handleAddDialogClose}
                onSubmit={handleAddSubmit}
                formData={addForm}
                onFormChange={handleAddFormChange}
              />

            {pagination.total > pagination.limit && (
              <Pagination
                count={Math.ceil(pagination.total / pagination.limit)}
                page={pagination.page}
                onChange={handlePageChange}
                color="primary"
                sx={{ mt: 4 }}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ConsejosDiarios;