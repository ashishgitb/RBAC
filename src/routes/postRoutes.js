const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { createPost, updatePost } = require('../controllers/postController');

// Only authenticated users can create posts
router.post('/', 
  authenticate, 
  authorize('admin', 'editor', 'author'), 
  createPost
);

// Only post author, editors, or admins can update posts
router.put('/:id', 
  authenticate, 
  authorize('admin', 'editor', 'author'), 
  updatePost
);

module.exports = router;