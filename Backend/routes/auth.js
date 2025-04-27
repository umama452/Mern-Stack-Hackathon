const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Signup Route
router.post('/signup', async (req, res) => {
  let { fullName, email, password } = req.body;
  email = email.toLowerCase().trim(); 

  try {
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const newUser = await User.create({
      fullName,
      email,
      password 
    });

    const userResponse = { ...newUser._doc };
    delete userResponse.password;

    res.status(201).json({
      message: 'Signup successful',
      user: userResponse
    });

  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({
      message: 'Signup failed',
      error: error.message
    });
  }
});


router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase().trim(); 

  try {
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

 
    const userResponse = { ...user._doc };
    delete userResponse.password;

    res.status(200).json({
      message: 'Login successful',
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      message: 'Login failed',
      error: error.message
    });
  }
});

module.exports = router;