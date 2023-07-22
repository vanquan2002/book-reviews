const Book = require('../models/Books');
const Comment = require('../models/Comment');
const User = require('../models/Users');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');

class AdminController {
    home(req, res, next) {
        res.render('admin')
    }
    async index(req, res, next) {
        const countBooks = await Book.count({});
        const countComments = await Comment.count({});
        const countUsers = await User.count({});
        
        res.render('me/statistical', {countBooks: countBooks, countComments: countComments, countUsers: countUsers})
    }
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
module.exports = new AdminController();
