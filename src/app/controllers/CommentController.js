const Comment = require('../models/Comment');

class CommentController {
    destroy(req, res, next) {
      Comment.deleteOne({ _id: req.params.id})
      .then(() => {
        res.redirect('/admin/stored/comments');
      })
      .catch(next);
    }
}

module.exports = new CommentController();
