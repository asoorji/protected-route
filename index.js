const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ndubuisiaso:J765uGBzds2LYKme@cluster0.y9ipvbd.mongodb.net/votar-auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));


app.use(express.json());

app.use('/auth', authRoutes);

// Protected route
app.get('/protected', (req, res) => {
  // Middleware to verify JWT and allow only authenticated users
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, '12345', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Token is valid, allow access to the protected route
    res.status(200).json({ message: 'Welcome to the protected route' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
