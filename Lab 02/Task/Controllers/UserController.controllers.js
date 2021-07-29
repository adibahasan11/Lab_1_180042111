const bcrypt = require('bcryptjs');
const db = require("../database");
const alert = require('alert');

var LocalStorage  = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./LocalStorage');

const getDashboard = (req, res) =>{
    res.render("Dashboard.ejs");
}

const getLogin = (req, res) =>{
    res.render("User-Auth/Login.ejs");
}

const postLogin = (req, res) =>{
    const email = req.body.email
    const password = req.body.password

    db.query('SELECT * FROM Users WHERE Email = ?',  [email], function(err, result, rows){
        if(err) {
            console.log(err);
        }

        if (!rows.length)
        {
            alert("No user found.");
            res.redirect("/register");
        }
        else
        {
            if (!bcrypt.compareSync(password, result[0].Password)) {
                alert("Wrong Password!")
                res.redirect('/login');
            }
            else
            {
                username = result[0].Name;
                console.log("User: " + result[0].Name + " found");
                localStorage.setItem("username", result[0].Name);
                res.redirect('/dashboard');
            }
        }
    });
}

const getRegister = (req, res) =>{
    res.render("User-Auth/Register.ejs");
}

const postRegister = (req, res) =>{
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const ConfirmPW = req.body.ConfirmPW

    const passwordHash = bcrypt.hashSync(password, 10);
    
    if ( name && email && password && ConfirmPW ){
        if (password === ConfirmPW){
            try {
                db.promise().query( `INSERT INTO users (Name, Email, Password) VALUES( '${name}', '${email}', '${passwordHash}' )`);
                res.redirect("/login");
                console.log( "User Created" );
            } catch (error) {
                console.log(error);
            }
        }
        else{
            alert('Rewrite your password correctly.');
        }
    }
}

const logout = (req,res)=> {
    localStorage.removeItem("username")
    res.redirect('/')
}

module.exports = { getRegister, getLogin, getDashboard, postRegister, postLogin, logout };