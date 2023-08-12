exports.request = (req, res, next) => {
    if (req.session.userObj) {
        next()
    } else {
        res.redirect('/login')
    }
}