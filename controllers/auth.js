const passport = require('passport');

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // process.stdout.write(info.toString());
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
    }

    res.json({ message: 'login success' });
  })(req, res, next);
};
exports.postRegister = (req, res) => {};
