const { taskDB } = require('../config/jsonDB');

const taskSchema = {
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, default: 'todo', enum: ['todo', 'in-progress', 'done'] },
  priority: { type: String, default: 'medium', enum: ['low', 'medium', 'high'] },
  owner: { type: String, required: true }
};

// Task Model (using JSON database)
const Task = {
  // Find all tasks (returns array directly)
  find: (query = {}) => {
    if (query.owner) return taskDB.getByOwner(query.owner);
    return taskDB.getAll();
  },
  
  // Find task by ID
  findById: (id) => taskDB.getById(id),
  
  // Find one task by query
  findOne: (query) => {
    if (query._id) return taskDB.getById(query._id);
    return null;
  },
  
  // Create new task
  create: (data) => taskDB.create(data),
  
  // Find and update task
  findOneAndUpdate: (query, updates) => {
    if (query._id) return taskDB.updateById(query._id, updates);
    return null;
  },
  
  // Find and delete task
  findOneAndDelete: (query) => {
    if (query._id) return taskDB.deleteById(query._id);
    return false;
  }
};

module.exports = Task;
