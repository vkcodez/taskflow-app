<<<<<<< HEAD
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
=======
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false  // Never return password in queries
  },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
