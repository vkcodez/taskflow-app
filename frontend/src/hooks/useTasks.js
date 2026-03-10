// ♻️ Reusable: Encapsulates all task CRUD state + API calls
import { useState, useCallback } from 'react';
import { taskService } from '../services/taskService';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const res = await taskService.getAll(filters);
      setTasks(res.data.data.tasks);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (data) => {
    const res = await taskService.create(data);
    setTasks(prev => [res.data.data.task, ...prev]);
    toast.success('Task created!');
    return res.data.data.task;
  };

  const updateTask = async (id, data) => {
    const res = await taskService.update(id, data);
    setTasks(prev => prev.map(t => t._id === id ? res.data.data.task : t));
    toast.success('Task updated!');
  };

  const deleteTask = async (id) => {
    await taskService.delete(id);
    setTasks(prev => prev.filter(t => t._id !== id));
    toast.success('Task deleted');
  };

  return { tasks, loading, fetchTasks, createTask, updateTask, deleteTask };
};