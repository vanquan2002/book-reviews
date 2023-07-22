const Book = require('../models/Books');
const Comment = require('../models/Comment');
const { mutipleToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');
const validator = require('validator');

class BookController {
    async show(req, res, next) {
        var user = req.body;
        const comments = await Comment.find({productComment: req.params.slug}).sort({dateComment: -1});

        Book.findOne({ slug: req.params.slug })
            .then(book => {
                const context = {
                    user: user,
                    book: { book: mutipleToObject(book) },
                    comments: mutipleMongooseToObject(comments)
                }
                // console.log(context);
                res.render('books/show', context);
            })
            .catch(next);
    }

    create(req, res, next) {
        res.render('books/create')
    }

    store(req, res) {
        try {
          if(validator.isEmpty(req.body.name)) {
            return res.render('books/create', {errName: 'Tên sách không được để trống!'})
          }
          if(validator.isEmpty(req.body.author)) {
            return res.render('books/create', {errAuthor: 'Tên tác giả không được để trống!'})
          }
          if(validator.isEmpty(req.body.company)) {
            return res.render('books/create', {errCompany: 'Nhà xuất bản không được để trống!'})
          }
          if(validator.isEmpty(req.body.description)) {
            return res.render('books/create', {errDescription: 'Mô tả không được để trống!'})
          }
            const formData = req.body;
            const book = new Book(formData);
            if (req.file) {
                book.image = req.file.filename;
            }
            book.save();
            res.redirect('/admin/stored/books');
          } catch (error) {
            console.error(error);
            // Handle error response here
          }
    }

    edit(req, res, next) {
        Book.findById( req.params.id )
            .then(book => {
                res.render('books/edit', { book: mutipleToObject(book) });
            })
            .catch(next);
    }

    update(req, res, next) {
        return Book.findById(req.params.id)
          .then(book => {
            book.name = req.body.name;
            book.author = req.body.author;
            book.company = req.body.company;
            book.description = req.body.description;
            if (req.file) {
              book.image = req.file.filename;
            }
            return book.save();
          })
          .then(() => {
            res.redirect('/admin/stored/books');
          })
          .catch(next);
      }

    destroy(req, res, next) {
        Book.deleteOne({ _id: req.params.id})
        .then(() => {
          res.redirect('/admin/stored/books');
        })
        .catch(next);
    }

    async comment(req, res, next) {
      const slug = req.params.slug;
      const content = req.body.content;
      await Comment.create({
        content: content,
        dateComment: new Date(),
        userComment: req.session.userData.user,
        productComment: slug
      })
      res.redirect(`/books/${slug}`)
    }

    async search(req, res, next) {
      const dataSearch = req.body.inputSearch;
      const bookSearch = await Book.find({name: {$regex: new RegExp(dataSearch, 'i')}});
      if(bookSearch == '') {
        return res.render('search', {text: 'Không tìm thấy dữ liệu!'});
      }
      // console.log(bookSearch);
      return res.render('search', {books: mutipleMongooseToObject(bookSearch)});
    }
}

module.exports = new BookController();
