const getRegister = (req, res) =>{
    res.sendFile("Register.html", {root:"./Views/Users"});
}

const postRegister = (req, res) =>{
    //const username = req.body.username
    //const email = req.body.email
    //const password = req.body.password
    //const C_password = req.body.C_password

    //res.sendFile("Register.html", {root:"./Views/Users"});
    //res.send("<h1>User with Email : " + email + " and username : " + username + " is requesting to access the dashboard.</h1>")
    res.redirect("/dashboard");
}

const getLogin = (req, res) =>{
    const {id, username} = req.query;
    
    res.send("User with ID : " + id + " and username : " + username + " is requesting to Log In");
}

const getDashboard = (req, res) =>{
    res.send("User Dashboard");
}

module.exports = { getRegister, postRegister, getLogin, getDashboard };