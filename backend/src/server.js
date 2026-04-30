<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet());
// allow any localhost port during development, otherwise restrict to CLIENT_URL
app.use(cors({ 
  origin: process.env.NODE_ENV === 'development' ? /http:\/\/localhost:\d+/ : process.env.CLIENT_URL,
  credentials: true 
}));

// Rate Limiting — 100 requests per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// Request Parsing & Logging
app.use(express.json({ limit: '10kb' }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date() });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
=======
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet());
// allow any localhost port during development, otherwise restrict to CLIENT_URL
app.use(cors({ 
  origin: process.env.NODE_ENV === 'development' ? /http:\/\/localhost:\d+/ : process.env.CLIENT_URL,
  credentials: true 
}));

// Rate Limiting — 100 requests per 15 min per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// Request Parsing & Logging
app.use(express.json({ limit: '10kb' }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date() });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));