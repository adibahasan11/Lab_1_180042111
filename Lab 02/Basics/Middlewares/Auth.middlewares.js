const isLoggedIn = (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const C_password = req.body.C_password

    //res.sendFile("Register.html", {root:"./Views/Users"});
    if (username == 'Admin'){
        next();
    }
    else {
        res.redirect("/register");
    }
    //res.send("<h1>User with Email : " + email + " and username : " + username + " is requesting to access the dashboard.</h1>")
};

module.exports = isLoggedIn;