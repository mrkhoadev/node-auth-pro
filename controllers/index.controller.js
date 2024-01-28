module.exports = {
    index: (req, res, next) => {
        res.render("index", { user: req.user });
    },
    logout: (req, res, next) => {
        req.logout((err) => {});
        return res.redirect("/auth/login");
    },
}