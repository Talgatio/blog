module.exports = {

    addBlog: (req, res) => {
        let isAuth = req.isAuthenticated();
        res.render('addBlog', {isAuth});
    },

    addComment: (req, res) => {
        let isAuth = req.isAuthenticated();
        res.render('addComment', {isAuth});
    }
}