import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';

const theme = {
  primary: '#2e7d32',
  secondary: '#4caf50',
  light: '#e8f5e9',
  dark: '#1b5e20',
  text: '#1e293b',
  warning: '#ff9800',
  error: '#f44336'
};

const ChurnAnalysisDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [visualizations, setVisualizations] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState({
    visualizations: true,
    report: true,
    updating: false
  });
  const [error, setError] = useState({
    visualizations: null,
    report: null,
    updating: null
  });

  // Fetch visualizations data
  useEffect(() => {
    const fetchVisualizations = async () => {
      try {
        const response = await fetch('/api/churn-analysis/visualizations');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setVisualizations(data.data.images);
      } catch (err) {
        setError(prev => ({...prev, visualizations: err.message}));
      } finally {
        setLoading(prev => ({...prev, visualizations: false}));
      }
    };

    fetchVisualizations();
  }, []);

  // Fetch detailed report
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('/api/churn-analysis/detailed-report');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setReport(data.data);
      } catch (err) {
        setError(prev => ({...prev, report: err.message}));
      } finally {
        setLoading(prev => ({...prev, report: false}));
      }
    };

    fetchReport();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUpdateModel = async () => {
    setLoading(prev => ({...prev, updating: true}));
    setError(prev => ({...prev, updating: null}));
    
    try {
      const response = await fetch('/api/churn-analysis/full-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`Error al actualizar el modelo: ${response.status}`);
      
      // Recargar los datos después de actualizar
      const [visResponse, reportResponse] = await Promise.all([
        fetch('/api/churn-analysis/visualizations'),
        fetch('/api/churn-analysis/detailed-report')
      ]);
      
      const visData = await visResponse.json();
      const reportData = await reportResponse.json();
      
      setVisualizations(visData.data.images);
      setReport(reportData.data);
    } catch (err) {
      setError(prev => ({...prev, updating: err.message}));
    } finally {
      setLoading(prev => ({...prev, updating: false}));
    }
  };

  const getStatusColor = (code) => {
    switch(code) {
      case 0: return 'success'; // Activo
      case 1: return 'error';   // Abandonó
      default: return 'default';
    }
  };

  const getRiskColor = (riskLevel) => {
    switch(riskLevel) {
      case 'Bajo': return 'success';
      case 'Medio': return 'warning';
      case 'Alto': return 'error';
      default: return 'default';
    }
  };

  if (loading.visualizations || loading.report) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error.visualizations || error.report) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        padding: 2
      }}>
        <Alert severity="error" sx={{ maxWidth: 600 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Error al cargar los datos</Typography>
          {error.visualizations && <Typography>Visualizaciones: {error.visualizations}</Typography>}
          {error.report && <Typography>Reporte: {error.report}</Typography>}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header con botón de actualización */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h4" sx={{ color: theme.dark }}>
          Análisis de Churn
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Ayuda">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={handleUpdateModel}
            disabled={loading.updating}
          >
            {loading.updating ? 'Actualizando...' : 'Actualizar Modelo'}
          </Button>
        </Box>
      </Box>

      {error.updating && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error.updating}
        </Alert>
      )}

      {/* Tabs principales */}
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        sx={{ mb: 3 }}
      >
        <Tab label="Visualizaciones" />
        <Tab label="Recomendaciones" />
        <Tab label="Resumen de Riesgo" />
        <Tab label="Estadísticas" />
      </Tabs>

      {/* Contenido de las tabs */}
      {tabValue === 0 && visualizations && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {tabValue === 0 ? 'Predicciones Futuras' : 'Distribución de Riesgo'}
            </Typography>
            <img 
              src={`data:image/png;base64,${tabValue === 0 ? visualizations.future_predictions : visualizations.risk_distribution}`} 
              alt="Visualización de análisis"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </CardContent>
        </Card>
      )}

      {tabValue === 1 && report?.intervention_recommendations && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {report.intervention_recommendations.title}
            </Typography>
            
            <List>
              {report.intervention_recommendations.users.map((user, index) => (
                <React.Fragment key={user.user_id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.light }}>
                        {user.status.emoji}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography component="span" fontWeight="bold">
                            Usuario {user.user_id.substring(0, 8)}
                          </Typography>
                          <Chip 
                            label={user.status.text} 
                            size="small" 
                            color={getStatusColor(user.status.code)}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Box sx={{ display: 'flex', gap: 2, mt: 1, mb: 1 }}>
                            <Chip 
                              label={`Riesgo promedio: ${(user.metrics.avg_churn_risk * 100).toFixed(1)}%`} 
                              size="small"
                            />
                            <Chip 
                              label={`Engagement: ${user.metrics.avg_engagement.toFixed(1)}%`} 
                              size="small"
                              color={user.metrics.engagement_trend >= 0 ? 'success' : 'error'}
                              variant="outlined"
                            />
                            <Chip 
                              label={`Tendencia: ${user.metrics.engagement_trend_formatted}%`} 
                              size="small"
                              color={user.metrics.engagement_trend >= 0 ? 'success' : 'error'}
                            />
                          </Box>
                          <List dense>
                            {user.recommendations.map((rec, i) => (
                              <ListItem key={i} sx={{ py: 0 }}>
                                <ListItemText primary={rec} />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      }
                    />
                  </ListItem>
                  {index < report.intervention_recommendations.users.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {tabValue === 2 && report?.risk_summary && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {report.risk_summary.title}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Paper sx={{ p: 2, textAlign: 'center', flex: 1 }}>
                    <Typography variant="h5">{report.risk_summary.users_analyzed.active_users}</Typography>
                    <Typography variant="body2">Usuarios activos</Typography>
                  </Paper>
                  <Paper sx={{ p: 2, textAlign: 'center', flex: 1 }}>
                    <Typography variant="h5">{report.risk_summary.users_analyzed.churned_users}</Typography>
                    <Typography variant="body2">Usuarios abandonados</Typography>
                  </Paper>
                  <Paper sx={{ p: 2, textAlign: 'center', flex: 1 }}>
                    <Typography variant="h5">{report.risk_summary.users_analyzed.total_users}</Typography>
                    <Typography variant="body2">Total analizados</Typography>
                  </Paper>
                </Box>

                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Distribución de riesgo
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nivel de riesgo</TableCell>
                        <TableCell align="right">Usuarios</TableCell>
                        <TableCell align="right">Porcentaje</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(report.risk_summary.risk_distribution).map(([level, data]) => (
                        <TableRow key={level}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {data.emoji} {level}
                            </Box>
                          </TableCell>
                          <TableCell align="right">{data.count}</TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={`${data.percentage}%`} 
                              size="small"
                              color={getRiskColor(level)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            {visualizations && (
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Visualización de distribución de riesgo
                  </Typography>
                  <img 
                    src={`data:image/png;base64,${visualizations.risk_distribution}`} 
                    alt="Distribución de riesgo"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      )}

      {tabValue === 3 && report?.model_statistics && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {report.model_statistics.title}
            </Typography>
            
            <Grid container spacing={2}>
              {Object.entries(report.model_statistics.stats).map(([key, value]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                      {key.replace(/_/g, ' ')}
                    </Typography>
                    <Typography variant="h5">
                      {typeof value === 'number' ? value.toLocaleString() : value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            
            {report.metadata && (
              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.light}` }}>
                <Typography variant="body2" color="text.secondary">
                  Generado el: {new Date(report.metadata.generated_at).toLocaleString()}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ChurnAnalysisDashboard;