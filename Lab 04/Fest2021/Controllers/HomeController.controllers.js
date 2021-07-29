var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./LocalStorage');

const getDashboard = (req, res) =>{
    const username = localStorage.getItem("username")
    
    res.render("Dashboard.ejs", { username: username });
}

module.exports = { getDashboard };