var userModel = require('../models/user.model')

exports.login = async (req, res, next) => {

    let msg = ''
    let email = ''
    let passwd

    if (req.method == 'POST') {
        let userObj = await userModel.findOne({ email: req.body.email })
        if (userObj) {
            if (userObj.password == req.body.passwd && userObj.type.toLowerCase() == 'admin') {
                req.session.userObj = userObj
                return res.redirect('/dashboard')
            } else {
                msg = 'Mật khẩu chưa khớp hoặc tài khoản của bạn chưa được cấp quyền truy cập'
            }
        } else {
            msg = 'Email không hợp lệ'
        }
    }
    email = req.body.email
    passwd = req.body.passwd
    res.render('login', { layout: false, msg, email, passwd })
}