const { render } = require('ejs')
var userModel = require('../models/user.model')
var fs = require('fs')
var path = require('path')

exports.users = async (req, res, next) => {

    let userData = await userModel.find()

    res.render('user/users', { title: 'Người dùng', userData })
}

exports.addUser = async (req, res, next) => {

    let msg = ''
    if (req.method == 'POST') {
        let tmpPath = req.file.path
        let date = new Date()
        let imgDir = path.join('/uploads', 'users', date.getFullYear().toString(), (date.getMonth() + 1).toString())
        let targetDir = path.join(__dirname, '..', 'public', imgDir)
        fs.mkdir(targetDir, { recursive: true }, (err) => {
            let imgFileName = `${date.getTime().toString()}-${req.file.originalname}`
            let targetPath = path.join(targetDir, imgFileName)

            fs.readFile(tmpPath, function (err, data) {
                if (err) throw err;
                fs.writeFile(targetPath, data, function (err) {
                    if (err) throw err;
                    fs.unlink(tmpPath, function (err) {
                        if (err) throw err;

                        let userObj = new userModel()
                        userObj.name = req.body.name
                        userObj.email = req.body.email
                        userObj.password = req.body.password
                        userObj.type = req.body.type
                        userObj.status = req.body.status
                        userObj.image = path.join(imgDir, imgFileName).replaceAll('\\', '/')

                        userObj.save().then(() => {
                            msg = 'Thêm người dùng thành công'
                            res.render('user/userNotification', { title: 'Thêm người dùng', msg })
                        }).catch(err => {
                            console.log(err)
                            msg = "Thêm người dùng thất bại"
                            res.render('user/userNotification', { title: 'Thêm sản phẩm', msg })
                        })
                    });
                });
            });
        })
    } else {
        res.render('user/userNotification', { title: 'Thêm người dùng', msg })
    }
}

exports.editUser = async (req, res, next) => {

    let msg = ''
    if (req.method == 'POST') {
        let userObj = new userModel()
        userObj.name = req.body.name
        userObj.email = req.body.email
        userObj.password = req.body.password
        userObj.type = req.body.type
        userObj._id = req.body.id
        userObj.status = req.body.status

        if (req.file) {
            let tmpPath = req.file.path
            let date = new Date()
            let imgDir = path.join('/uploads', 'users', date.getFullYear().toString(), (date.getMonth() + 1).toString())
            let targetDir = path.join(__dirname, '..', 'public', imgDir)


            fs.mkdir(targetDir, { recursive: true }, (err) => {
                let imgFileName = `${date.getTime().toString()}-${req.file.originalname}`
                let targetPath = path.join(targetDir, imgFileName)

                fs.readFile(tmpPath, function (err, data) {
                    if (err) throw err;
                    fs.writeFile(targetPath, data, function (err) {
                        if (err) throw err;
                        fs.unlink(tmpPath, function (err) {
                            if (err) throw err;

                            userObj.image = path.join(imgDir, imgFileName).replaceAll('\\', '/')

                            userModel.findByIdAndUpdate(userObj._id, userObj)
                                .then(() => {
                                    msg = "Đã cập nhật người dùng có ID : " + userObj._id
                                    res.render('user/userNotification', { title: 'Cập nhât người dùng', msg })
                                }).catch((err) => {
                                    console.log(err)
                                    msg = "Cập nhật người dùng thất bại"
                                    res.render('user/userNotification', { title: 'Cập nhât người dùng', msg })
                                })
                        });
                    });
                });
            })
        } else {
            userModel.findByIdAndUpdate(userObj._id, userObj)
                .then((user) => {
                    msg = "Đã cập nhật người dùng có ID : " + userObj._id
                    res.render('user/userNotification', { title: 'Cập nhât người dùng', msg })
                }).catch((err) => {
                    console.log(err)
                    msg = "Cập nhật người dùng thất bại"
                    res.render('user/userNotification', { title: 'Cập nhât người dùng', msg })
                })
        }
    } else {
        res.render('user/userNotification', { title: 'Cập nhât người dùng', msg })
    }
}

exports.deleteUser = async (req, res, next) => {
    let msg = ''
    if (req.method == 'POST') {

        let id = req.body.id

        try {

            await userModel.findByIdAndDelete(id)

            msg = "Đã xóa người dùng có ID : " + id
        } catch (err) {
            msg = "Cập nhật người dùng thất bại"
            console.log(err)
        }
    }

    res.render('user/userNotification', { title: 'Xóa người dùng', msg })
}