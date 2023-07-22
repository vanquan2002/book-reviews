const User = require('../models/Users');
const Books = require('../models/Books');
const { mutipleMongooseToObject } = require('../../ulti/mongoose');
const { mutipleToObject } = require('../../ulti/mongoose');
const validator = require('validator');


class AuthController {
    login(req, res, next) {
        res.render('auth/login')
    }

    home(req, res, next) {
        Books.find({})
            .then(books=> {
                res.render('home', {
                    books: mutipleMongooseToObject(books)
                })
            })
            .catch(next);
    }

    goLogin(req, res, next) {
        var user = req.body.user;
        var password = req.body.password;

        if(validator.isEmpty(user)) {
            return res.render('auth/login', {errUser: 'Tên người không được để trống!!'})
        } else if (!validator.isLength(user, {min: 3, max: 20})) {
            return res.render('auth/login', {errUser: 'Tên người dùng ít nhất 3 ký tự!'})
        }

        if(validator.isEmpty(password)) {
            return res.render('auth/login', {errPassword: 'Mật khẩu không được để trống!'})
        } else if (!validator.isLength(password, {min: 6})) {
            return res.render('auth/login', {errPassword: 'Mật khẩu phải có ít nhất 6 ký tự!'})
        }
        
        User.findOne({ 
            user: user,
            password: password
        })
        .then(data => {
            if (data) {
                // console.log(data); 
                req.session.userData = data;
                res.redirect('home');             
            } else {
                return res.render('auth/login', {errLogin: 'Tên người dùng hoặc mật khẩu không chính xác!'})
            }
        })
        .catch(err=>{
            res.status(500).send('Lỗi server')
        });
    }

    register(req, res, next){
        res.render('auth/register')
    }

    create(req, res, next){
        var user = req.body.user;
        var password = req.body.password;
        var email = req.body.email;
        var typeUser = 0;
        

        if(validator.isEmpty(user)) {
            return res.render('auth/register', {errUser: 'Tên người không được để trống!!'})
        } else if (!validator.isLength(user, {min: 3, max: 20})) {
            return res.render('auth/register', {errUser: 'Tên người dùng phải có độ dài từ 3 đến 20 ký tự!'})
        }

        if(validator.isEmpty(password)) {
            return res.render('auth/register', {errPassword: 'Mật khẩu không được để trống!'})
        } else if (!validator.isLength(password, {min: 6})) {
            return res.render('auth/register', {errPassword: 'Mật khẩu phải có ít nhất 6 ký tự!'})
        }

        if(validator.isEmpty(email)) {
            return res.render('auth/register', {errEmail: 'Email không được để trống!'})
        } else if (!validator.isEmail(email)) {
            return res.render('auth/register', {errEmail: 'Địa chỉ email không hợp lệ!'})
        }

        User.findOne({ 
            user: user
        })
        .then(data=>{
            if (data) {
                return res.render('auth/register', {errCreate: 'User này đã tồn tại!'})
            }else{
                return User.create({ 
                    user: user,
                    password: password,
                    email: email,
                    typeUser: typeUser

                })
            }
        })
        .then(data => {
            res.render('auth/login')
        })
        .catch(err=>{
            // Xử lý lỗi
        });
    }

    logout(req, res){
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.redirect('/');
        })
    };
}
module.exports = new AuthController();