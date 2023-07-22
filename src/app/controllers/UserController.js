const User = require('../models/Users');
const { mutipleToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');

class UserController {
    edit(req, res, next) {
      User.findById( req.params.id )
            .then(user => {
                res.render('users/edit', { user: mutipleToObject(user) });
            })
            .catch(next);
    }

    destroy(req, res, next) {
      User.deleteOne({ _id: req.params.id})
      .then(() => {
        res.redirect('/admin/stored/users');
      })
      .catch(next);
    }

    update(req, res, next) {
        return User.findById(req.params.id)
          .then(user => {
            user.user = req.body.user;
            user.password = req.body.password;
            user.email = req.body.email;
            return user.save();
          })
          .then(() => {
            res.redirect('/admin/stored/users');
          })
          .catch(next);
      }
}

module.exports = new UserController();
