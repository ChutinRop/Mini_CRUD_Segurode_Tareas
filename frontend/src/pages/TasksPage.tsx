// src/pages/TasksPage.tsx
import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Checkbox,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTask = await createTask({ title: newTitle, description: newDescription });
      setTasks([...tasks, newTask]);
      setNewTitle('');
      setNewDescription('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleTask = async (id: number, currentStatus: boolean) => {
    try {
      const updatedTask = await updateTask(id, { done: !currentStatus });
      setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ color: '#1976d2' }}
        >
          Mis Tareas
        </Typography>

        {/* Formulario de creación */}
        <Card sx={{ mb: 4, p: 3, borderRadius: 3, boxShadow: 4 }}>
          <form onSubmit={handleCreateTask}>
            <Typography variant="h6" gutterBottom>
              Crear nueva tarea
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TextField
              label="Título de la Tarea"
              fullWidth
              required
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Descripción (opcional)"
              fullWidth
              multiline
              rows={2}
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddCircleIcon />}
              fullWidth
              sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
            >
              Agregar Tarea
            </Button>
          </form>
        </Card>

        {/* Contenedor de tareas usando flex */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: tasks.length === 0 ? 'center' : 'flex-start',
          }}
        >
          {tasks.length > 0 ? (
            tasks.map(task => (
              <Card
                key={task.id}
                sx={{
                  flex: '1 1 250px', // ancho mínimo 250px y flexible
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: 4,
                  backgroundColor: task.done ? '#e0f7fa' : '#fff3e0',
                  opacity: task.done ? 0.8 : 1,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: 6 },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Checkbox
                      checked={task.done}
                      onChange={() => handleToggleTask(task.id, task.done)}
                      sx={{ color: task.done ? 'green' : 'orange' }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: task.done ? 'line-through' : 'none',
                        flexGrow: 1,
                      }}
                    >
                      {task.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {task.description || 'Sin descripción'}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteTask(task.id)}
                    sx={{ '&:hover': { backgroundColor: '#fddede' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          ) : (
            <Typography align="center" sx={{ mt: 2 }}>
              No tienes tareas pendientes.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default TasksPage;
