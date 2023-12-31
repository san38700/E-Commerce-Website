const Post = require('../models/post')
const Comment = require('../models/comment')

exports.createPost = async (req, res) => {
    try {
      const { img, description } = req.body;
      const newPost = await Post.create({ img, description });
      res.status(201).json({ post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
exports.getPosts = async (req, res) => {
    try {
      const posts = await Post.findAll({ include: Comment });
      res.status(200).json({ posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.getPostWithComments = async (req, res) => {
    const postId = req.params.postId;
  
    try {
      const post = await Post.findByPk(postId, { include: Comment });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json({ post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
