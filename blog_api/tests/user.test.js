/* eslint-env jest */
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Connect to a test database before running tests
beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
        
    });
});

// Clear the database after each test
afterEach(async () => {
    await User.deleteMany();
});

// Close the connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Model', () => {
    test('should create a user with a username and password', async () => {
        const username = 'testuser';
        const password = 'plainpassword';
        const user = new User({ username, password });
        await user.save();
        
        // Fetch the saved user
        const savedUser = await User.findOne({ username });

        // Check username and hashed password
        expect(savedUser.username).toBe(username);
        expect(savedUser.password).not.toBe(password); // Ensure password is hashed

        // Verify password hash
        const isMatch = await bcrypt.compare(password, savedUser.password);
        expect(isMatch).toBe(true);
    }, 10000); // Increase timeout to 10000 ms
});
