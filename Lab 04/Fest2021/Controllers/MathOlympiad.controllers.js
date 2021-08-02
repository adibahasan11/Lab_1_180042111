const MathOlympiad = require("../Models/MathOlympiad.model");

var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./LocalStorage');

const username = localStorage.getItem("username");

const getRegisterMO = (req, res) =>{
    res.render("Math-Olympiad/Register.ejs", { username: username, error: req.flash("error") });
}

const postRegisterMO = (req, res) =>{
    const { name, category, contact, email, institution, tshirt } = req.body;
    let error = "";

    console.log(name);
    console.log(category);
    console.log(contact);
    console.log(email);
    console.log(institution);
    console.log(tshirt);

    let registrationFee = 0;
    if (category == "School") {
        registrationFee = 250;
    }
    else if (category == "College") {
        registrationFee = 400;
    } 
    else {
        registrationFee = 500;
    }

    const total = registrationFee;
    const paid = 0;
    const selected = false;

    MathOlympiad.findOne({ name: name, contact: contact }).then( (participant) => {
        if (participant) {
            error = "Participant already exists with this name and contact number.";

            req.flash("error", error);
            res.redirect("register");
        }
        else {
            const participant = new MathOlympiad({
                name : name,
                category : category,
                contact : contact,
                email : email,
                institution : institution,
                total : total,
                paid : paid,
                selected : selected,
                tshirt : tshirt,
            });

            participant
                .save()
                .then(() => {
                    console.log("Participant Added: " + name);
                    error = "Participant Added Successfully"
                    
                    req.flash("error", error);
                    res.redirect('/Participant-list');
                })
                .catch((err)=>{
                    console.log(err)
                    error = "An Unexpected Error while Creating New User.";

                    req.flash("error", error);
                    res.redirect("register");
                });
        }
    })
}

const getMOList = (req, res) =>{
    res.render("Math-Olympiad/List.ejs", { username: username });
}

const deleteMO = (req, res) =>{
    const id = req.params.id;
    console.log(id);
    res.render("Math-Olympiad/List.ejs", { username: username });
}

module.exports = { getRegisterMO, getMOList, postRegisterMO, deleteMO };