const checkPermision = require('../middleware/checkPermison');
const adminRouter = require('./admin');
const booksRouter = require('./books');
const usersRouter = require('./users');
const commentsRouter = require('./comments');
const authRouter = require('./auth');

function route(app) {
    app.use('/', authRouter);
    app.use('/books', booksRouter);
    app.use('/users', checkPermision.checkPermision, usersRouter);
    app.use('/comments', checkPermision.checkPermision, commentsRouter);
    app.use('/admin', checkPermision.checkPermision, adminRouter);
}

module.exports = route;
