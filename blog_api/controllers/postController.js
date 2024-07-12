// controllers/postController.js
const Post = require('../models/post');

// Create a new post
exports.createPost = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a Post 
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true,
         });

        if (!post) {
            return res.status(404).send({ error: 'Post not found.' });
        }

        res.send(post);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete(req.params.id);

        if (!post) {
            return res.status(404).send({ error: 'Post not found.' });
        }

        res.send({ message: 'Post deleted successfully' });  // Success message
    } catch (error) {
        res.status(500).send(error);
    }
};
