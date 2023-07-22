const Book = require('../models/Books');
const User = require('../models/Users');
const Comment = require('../models/Comment');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');

class MeController {
    storedBook(req, res, next) {
        Book.find({})
            .then(books=> {
                res.render('me/stored-books', {
                    books: mutipleMongooseToObject(books)
                })
            })
            .catch(next);
    }
    storedUser(req, res, next) {
        User.find({})
            .then(users=> {
                res.render('me/stored-users', {
                    users: mutipleMongooseToObject(users)
                })
            })
            .catch(next);
    }
    storedComment(req, res, next) {
        Comment.find({})
            .then(comments=> {
                res.render('me/stored-comments', {
                    comments: mutipleMongooseToObject(comments)
                })
            })
            .catch(next);
    }
}
module.exports = new MeController();
