const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Register new user
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send({error: 'Registration failed', details: error});
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const token = await user.generateAuthToken();
        res.send({ 
            message: 'Login Successful',
            user, 
            token });
    } catch (error) {
        res.status(400).send({error: 'Login failed', details: error });
    }
});

// Get all users
router.get('/users', async (_req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send({error: 'Fetching users failed', details: error });
    }
});

module.exports = router;
