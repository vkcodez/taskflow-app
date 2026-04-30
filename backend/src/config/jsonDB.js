const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const usersFile = path.join(DATA_DIR, 'users.json');
const tasksFile = path.join(DATA_DIR, 'tasks.json');

// Initialize files if they don't exist
[usersFile, tasksFile].forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '[]', 'utf8');
  }
});

// Read data from JSON file
const readJSON = (file) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Write data to JSON file
const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
};

// User operations
const userDB = {
  getAll: () => readJSON(usersFile),
  
  getById: (id) => {
    const users = readJSON(usersFile);
    return users.find(u => u._id === id);
  },
  
  getByEmail: (email) => {
    const users = readJSON(usersFile);
    return users.find(u => u.email === email);
  },
  
  create: (userData) => {
    const users = readJSON(usersFile);
    const newUser = {
      _id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(newUser);
    writeJSON(usersFile, users);
    return newUser;
  },
  
  updateById: (id, updates) => {
    const users = readJSON(usersFile);
    const index = users.findIndex(u => u._id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
    writeJSON(usersFile, users);
    return users[index];
  },
  
  deleteById: (id) => {
    const users = readJSON(usersFile);
    const filtered = users.filter(u => u._id !== id);
    writeJSON(usersFile, filtered);
    return filtered.length < users.length;
  }
};

// Task operations
const taskDB = {
  getAll: () => readJSON(tasksFile),
  
  getById: (id) => {
    const tasks = readJSON(tasksFile);
    return tasks.find(t => t._id === id);
  },
  
  getByOwner: (ownerId) => {
    const tasks = readJSON(tasksFile);
    return tasks.filter(t => t.owner === ownerId);
  },
  
  create: (taskData) => {
    const tasks = readJSON(tasksFile);
    const newTask = {
      _id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    writeJSON(tasksFile, tasks);
    return newTask;
  },
  
  updateById: (id, updates) => {
    const tasks = readJSON(tasksFile);
    const index = tasks.findIndex(t => t._id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...updates, updatedAt: new Date().toISOString() };
    writeJSON(tasksFile, tasks);
    return tasks[index];
  },
  
  deleteById: (id) => {
    const tasks = readJSON(tasksFile);
    const filtered = tasks.filter(t => t._id !== id);
    writeJSON(tasksFile, filtered);
    return filtered.length < tasks.length;
  },
  
  deleteByOwner: (ownerId) => {
    const tasks = readJSON(tasksFile);
    const filtered = tasks.filter(t => t.owner !== ownerId);
    writeJSON(tasksFile, filtered);
  }
};

module.exports = { userDB, taskDB };
