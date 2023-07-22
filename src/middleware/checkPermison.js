const User = require('../app/models/Users');

exports.checkPermision = async (req, res, next) => {
    const userExist = req.session.userData;
    if(!userExist) {
        return res.redirect('/');
    } 

    const user = await User.findOne({_id: userExist._id});
    if(user.typeUser === 1) {
        next();
    } else {
        return res.render('error', {err404: 'Bạn không có quyền truy cập!'});
    }
}