const passport = require("passport");
const { string } = require("yup");
module.exports = {
    index: (req, res, next) => {
        if (req.user) {
            return res.redirect("/")
        }
        const error = req.flash("error");
        res.render("auth/login", { error, req });
    },
    handleLogin: async (req, res, next) => {
        const validate = await req.validate(req.body, {
            email: string().required("Mật khẩu không được để trống!").email("Email không đúng định dạng!"),
            password: string()
                    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
                    .required("Mật khẩu không được để trống!")
        }) 
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!validate) {
                req.flash('old', { email: req.body.email });
                return res.redirect('/auth/login');
            }
            if (!user) {
                // Xác thực thất bại, lưu trữ giá trị email đã nhập và thông báo lỗi
                req.flash('error', info.message);
                req.flash('old', { email: req.body.email }); // Lưu lại giá trị email đã nhập
                return res.redirect('/auth/login');
            }
            // Xác thực thành công, đăng nhập người dùng và chuyển hướng đến trang thành công
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    },
    handleLoginGoogle: (req, res, next) => {
        passport.authenticate("google", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                // Xác thực thất bại, lưu trữ giá trị email đã nhập và thông báo lỗi
                req.flash('error', info.message);
                req.flash('old', { email: req.body.email }); // Lưu lại giá trị email đã nhập
                return res.redirect('/auth/login');
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        })(req, res, next);
    }
}