// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');

router.post('/posts', auth, postController.createPost);
router.get('/posts', auth, postController.getAllPosts);
router.get('/posts/:id', auth, postController.getPost);
router.put('/posts/:id', auth, postController.updatePost);
router.delete('/posts/:id', auth, postController.deletePost);

module.exports = router;
