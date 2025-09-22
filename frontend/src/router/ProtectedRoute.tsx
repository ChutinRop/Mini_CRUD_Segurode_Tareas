// src/router/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material'; // Para un indicador de carga

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth(); // <-- 1. Obtén isLoading

  // 2. Si está cargando, muestra un spinner o un mensaje
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // 3. Si no está autenticado (y ya no está cargando), redirige
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // 4. Si está autenticado, muestra la página
  return <Outlet />;
};

export default ProtectedRoute;