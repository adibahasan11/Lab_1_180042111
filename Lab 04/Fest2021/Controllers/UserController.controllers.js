const bcrypt = require('bcryptjs');
const User = require("../Models/User.model");

var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./LocalStorage');

const getLogin = (req, res) =>{
    res.render("User-Auth/Login.ejs", { errors: req.flash('errors') });
}

const postLogin = (req, res) =>{
    const email = req.body.email
    const password = req.body.password

    const errors = [];

    if ( !email || !password ){
        errors.push("All fields are required!");
    }

    if (errors.length > 0) {
        console.log(errors);
        
        req.flash("errors", errors);
        res.redirect("/login");
    }
    else {
        User.findOne({ email: email }).then( (user) => {
            if (user) {
                userPassword = user.password;
                
                if ( !bcrypt.compareSync(password, userPassword) ) {
                    errors.push("Wrong Password!")
                    res.redirect('/login');
                }
                else {
                    localStorage.setItem("username", user.name);
                    res.redirect('/dashboard');
                }
            }
            else {
                errors.push("User Not Found.");

                req.flash("errors", errors);
                res.redirect("/login");
            }
        });
    }
}

const getRegister = (req, res) =>{
    res.render("User-Auth/Register.ejs", { errors: req.flash('errors') });
}

const postRegister = (req, res) =>{
    const { name, email, password, ConfirmPW } = req.body
    
    const passwordHash = bcrypt.hashSync(password, 10);
    const errors = [];
    
    if ( !name || !email || !password || !ConfirmPW ){
        errors.push("All fields are required!");
    }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters!");
    }
    if (password !== ConfirmPW){
        errors.push("Passwords do not match!");
    }

    if (errors.length > 0) {
        console.log(errors);
        
        req.flash("errors", errors);
        res.redirect("/register");
    }
    else {
        User.findOne({ email: email }).then( (user) => {
            if (user) {
                errors.push("User already exists with this email.");

                req.flash("errors", errors);
                res.redirect("/register");
            }
            else {
                const newUser = new User({
                    name : name, 
                    email : email,
                    password : passwordHash,
                });

                newUser
                    .save()
                    .then(() => {
                        console.log("User created: " + name);
                        res.redirect('/login');
                    })
                    .catch((error)=>{
                        console.log(error)
                        errors.push("Error while Creating New User.");

                        req.flash("errors", errors);
                        res.redirect("/register");
                    });
            }
        })
    }
}

const logout = (req, res)=> {
    localStorage.removeItem("username")
    res.redirect('/')
}

module.exports = { getRegister, getLogin, postRegister, postLogin, logout };