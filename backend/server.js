const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./User');
const Flight = require('./flight'); // <-- Import your flight model

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// Register Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already used' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Flight Search Route
app.get('/flights', async (req, res) => {
  const { fromCity, toCity, departureDate, starttime, passengers } = req.query;

  if (!fromCity || !toCity) {
    return res.status(400).json({ message: 'From and To cities are required' });
  }

  const query = {
    source: { $regex: new RegExp(fromCity, 'i') },
    destination: { $regex: new RegExp(toCity, 'i') },
  };

  if (departureDate) query.date = departureDate;
  if (starttime) query.start_time = { $gte: starttime };
  if (passengers) query.remaining_seats = { $gte: parseInt(passengers) };

  try {
    const flights = await Flight.find(query);
    res.json({ flights });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
