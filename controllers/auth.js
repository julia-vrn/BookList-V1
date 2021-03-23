const User = require('../models/user');

exports.getLogin = (req, res) => {
    console.log(req.session);
    res.render('auth/login.ejs', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
}

exports.postLogin = (req, res) => {
    User.findById("60599f8f56868f11dc287ecc")
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
          console.log(err);
          res.redirect('/');
        });
      })
    .catch(error => {
        console.log(error);
    }); 
}

exports.postLogout = (req, res) => {
    //clear the session

    req.session.destroy(() => {
        res.redirect('/');
    });
}