import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const ErrorHandler = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <Snackbar
      open={error.open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={error.severity}
        sx={{ width: '100%' }}
      >
        {error.message}
      </Alert>
    </Snackbar>
  );
};

export const useErrorHandler = () => {
  const [error, setError] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  const handleCloseError = () => {
    setError({ ...error, open: false });
  };

  return { error, setError, handleCloseError };
};

export default ErrorHandler;