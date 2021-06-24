var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./LocalStorage');

const isLoggedIn = (req, res, next) => {
    const user = localStorage.getItem("username")

    if (user){
        next();
    }
    else {
        res.redirect('/login')
    }
}

module.exports = isLoggedIn;