const bcrypt = require('bcryptjs');
const { userDB } = require('../config/jsonDB');

const userSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  role: { type: String, default: 'user' }
};

// User Model (using JSON database)
const User = {
  // Find all users
  find: () => userDB.getAll(),
  
  // Find user by ID
  findById: (id) => userDB.getById(id),
  
  // Find user by email
  findOne: (query) => {
    if (query.email) return userDB.getByEmail(query.email);
    if (query._id) return userDB.getById(query._id);
    return null;
  },
  
  // Find user by email and include password
  findOneWithPassword: (email) => userDB.getByEmail(email),
  
  // Create new user
  create: async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    return userDB.create({
      ...data,
      password: hashedPassword
    });
  },
  
  // Find by ID and update
  findByIdAndUpdate: (id, updates) => userDB.updateById(id, updates),
  
  // Find by ID and delete
  findByIdAndDelete: (id) => userDB.deleteById(id),
  
  // Compare password method (attached to instance after find)
  comparePassword: function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }
};

// Helper to create user instance with methods
User.createInstance = (userData) => {
  const user = { ...userData };
  user.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
  return user;
};

module.exports = User;
