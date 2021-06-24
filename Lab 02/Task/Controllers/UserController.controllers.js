const bcrypt = require('bcryptjs');
const alert = require('alert');
const db = require("../database");

const getDashboard = (req, res) =>{
    res.sendFile("Dashboard.html", {root:"./Views"});
}

const getLogin = (req, res) =>{
    res.sendFile("Login.html", {root:"./Views/User-Auth"});
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
    }
    else
    {
        if (!bcrypt.compareSync(password, result[0].Password)) {
            res.redirect('/login');
        }
        else
        {
            console.log("User: " + result[0].Name + " found");
            res.redirect('/dashboard');
        }
    }
});

}

const getRegister = (req, res) =>{
    res.sendFile("Register.html", {root:"./Views/User-Auth"});
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

module.exports = { getRegister, getLogin, getDashboard, postRegister, postLogin };