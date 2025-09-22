// src/router/AppRouter.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TasksPage from '../pages/TasksPage';
import ProtectedRoute from './ProtectedRoute'; // <-- 1. Importa el guardia

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register', // 👈 nueva ruta para registro
    element: <RegisterPage />,
  },
  {
    // 2. Esta es la ruta padre protegida
    path: '/',
    element: <ProtectedRoute />,
    children: [
      // 3. Estas son las rutas hijas que estarán protegidas
      {
        index: true, // Esto hace que TasksPage sea la ruta por defecto para "/"
        element: <TasksPage />,
      },
      // Podríamos añadir más rutas protegidas aquí en el futuro, como /perfil
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;