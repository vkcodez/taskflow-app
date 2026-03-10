import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { Navbar } from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Spinner } from '../components/ui/Spinner';

const EMPTY_TASK = { title: '', description: '', status: 'todo', priority: 'medium' };

export const DashboardPage = () => {
  const { user } = useAuth();
  const { tasks, loading, fetchTasks, createTask, updateTask, deleteTask } = useTasks();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState(EMPTY_TASK);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTasks({ search, status: filterStatus, priority: filterPriority });
  }, [search, filterStatus, filterPriority, fetchTasks]);

  const openCreate = () => { setEditingTask(null); setForm(EMPTY_TASK); setModalOpen(true); };
  const openEdit = (task) => { setEditingTask(task); setForm(task); setModalOpen(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      if (editingTask) await updateTask(editingTask._id, form);
      else await createTask(form);
      setModalOpen(false);
    } finally { setSubmitting(false); }
  };

  const stats = [
    { label: 'Total', value: tasks.length, color: 'text-gray-700' },
    { label: 'Todo', value: tasks.filter(t => t.status === 'todo').length, color: 'text-gray-500' },
    { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: 'text-blue-600' },
    { label: 'Done', value: tasks.filter(t => t.status === 'done').length, color: 'text-emerald-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Good day, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage your tasks efficiently</p>
          </div>
          <Button onClick={openCreate}>+ New Task</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row gap-3">
          <Input placeholder="🔍 Search tasks..." value={search}
            onChange={e => setSearch(e.target.value)} className="flex-1" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white">
            <option value="">All Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 bg-white">
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="py-16"><Spinner size="lg" /></div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">📋</div>
            <p className="font-medium">No tasks found</p>
            <p className="text-sm mt-1">Create your first task to get started</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map(task => (
              <div key={task._id}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-4 hover:border-indigo-200 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-medium text-gray-900 ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </h3>
                    <Badge label={task.status} />
                    <Badge label={task.priority} />
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-1 truncate">{task.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(task)}>Edit</Button>
                  <Button variant="danger" size="sm" onClick={() => deleteTask(task._id)}>Del</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editingTask ? 'Edit Task' : 'Create New Task'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title *" placeholder="Enter task title" value={form.title}
            onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea rows={3} placeholder="Optional description..."
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Priority</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" className="flex-1" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="flex-1" loading={submitting}>
              {editingTask ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};