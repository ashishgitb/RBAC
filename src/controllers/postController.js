const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const post = new Post({
      title,
      content,
      author: req.user._id
    });

    await post.save();
    
    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, status } = req.body;
    
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or has editor/admin privileges
    if (post.author.toString() !== req.user._id.toString() && 
        !['admin', 'editor'].includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'You do not have permission to update this post' 
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.status = status || post.status;

    await post.save();
    
    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
};

module.exports = { createPost, updatePost };