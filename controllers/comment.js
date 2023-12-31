const Comment = require('../models/comment')
const Posts = require('../models/post')


exports.addComment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const newComment = await Comment.create({ comment, postId });
    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


