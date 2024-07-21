/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Post = require('../models/post');  // Adjust the path if necessary

// Connect to a test database before running tests
beforeAll(async () => {
    console.log('Setting up the database connection...');
    await mongoose.connect('mongodb://localhost:27017/blog_api_test');
    console.log('Database connection established.');
}, 10000); 

// Disconnect from the test database after running tests
afterAll(async () => {
    await mongoose.connection.close();
}, 10000);

// Cleanup database before each test
beforeEach(async () => {
    await Post.deleteMany({});
});

describe('Post Model Test', () => {
    it('should create a post successfully', async () => {
        const postData = {
            title: 'Test Post',
            content: 'This is a test post.',
            author: 'Test Author',
        };

        const post = new Post(postData);
        const savedPost = await post.save();

        expect(savedPost._id).toBeDefined();
        expect(savedPost.title).toBe(postData.title);
        expect(savedPost.content).toBe(postData.content);
        expect(savedPost.author).toBe(postData.author);
        expect(savedPost.createdAt).toBeDefined();
        expect(savedPost.updatedAt).toBeDefined();
    });

    it('should not create a post without a title', async () => {
        const postData = {
            content: 'This is a test post without a title.',
            author: 'Test Author',
        };

        try {
            const post = new Post(postData);
            await post.save();
        } catch (error) {
            expect(error.errors.title).toBeDefined();
        }
    });

    it('should not create a post without content', async () => {
        const postData = {
            title: 'Test Post without content',
            author: 'Test Author',
        };

        try {
            const post = new Post(postData);
            await post.save();
        } catch (error) {
            expect(error.errors.content).toBeDefined();
        }
    });

    it('should not create a post without an author', async () => {
        const postData = {
            title: 'Test Post without author',
            content: 'This is a test post without an author.',
        };

        try {
            const post = new Post(postData);
            await post.save();
        } catch (error) {
            expect(error.errors.author).toBeDefined();
        }
    });
});
