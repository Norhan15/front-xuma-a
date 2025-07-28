const validateLoginForm = (formData) => {
  // Validación de campo vacío para email
  if (!formData.email || formData.email.trim() === '') {
    return {
      open: true,
      message: 'El correo electrónico es obligatorio',
      severity: 'error',
      field: 'email'
    };
  }

  // Validación de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return {
      open: true,
      message: 'Por favor ingresa un correo electrónico válido (ejemplo: usuario@dominio.com)',
      severity: 'error',
      field: 'email'
    };
  }

  // Validación de longitud máxima para email
  if (formData.email.length > 100) {
    return {
      open: true,
      message: 'El correo electrónico no puede exceder los 100 caracteres',
      severity: 'error',
      field: 'email'
    };
  }

  // Validación de campo vacío para contraseña
  if (!formData.password || formData.password.trim() === '') {
    return {
      open: true,
      message: 'La contraseña es obligatoria',
      severity: 'error',
      field: 'password'
    };
  }

  // Para login, permitimos cualquier longitud de contraseña
  // La validación real se hace en el servidor
  return null;
};

export const initialErrors = {
  email: {
    error: false,
    message: ''
  },
  password: {
    error: false,
    message: ''
  }
};

export default validateLoginForm;