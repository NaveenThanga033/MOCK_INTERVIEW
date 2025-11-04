const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();

const interviewRoutes = require('./routes/interviews');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();


app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/interviews', interviewRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'AI Interview Pro Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('/{*any}', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});