const passport = require("passport");

module.exports = function (req, res, next) {

    passport.authenticate("local", { session: true }, function (err, user, info) {
        if (err) {
            return res.status(401).json({
                status: false,
                message: err
            });
        } else if (!user) {
            return res.status(200).json({
                status: false,
                message: info.message
            });
        }

        if (!req.isAuthenticated()) {
            return res.status(200).json({
                status: false,
                message: "Not authenticated"
            });
        }

        next();
    })(req, res, next);
};