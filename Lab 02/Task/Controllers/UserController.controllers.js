const getDashboard = (req, res) =>{
    res.sendFile("Dashboard.html", {root:"./Views"});
}

const getLogin = (req, res) =>{
    res.sendFile("Login.html", {root:"./Views/User-Auth"});
}

const getRegister = (req, res) =>{
    res.sendFile("Register.html", {root:"./Views/User-Auth"});
}

module.exports = { getRegister, getLogin, getDashboard };