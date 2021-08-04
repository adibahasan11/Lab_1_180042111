const ProgrammingContest = require("../Models/ProgContest.model");

var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./LocalStorage');

const username = localStorage.getItem("username");

const getRegisterPC = (req, res) =>{
    //res.render("Programming-Contest/Register.ejs", { username: username, error: req.flash("error") });
    res.render("Programming-Contest/Register.ejs", { username: username, error: req.flash("error") });
}

const postRegisterPC = (req, res) =>{
    const { teamName,
        institution,

        c_name,
        c_contact,
        c_email,
        c_tshirt,

        m_name0,
        m_contact0,
        m_email0,
        m_tshirt0,

        m_name1,
        m_contact1,
        m_email1,
        m_tshirt1,

        m_name2,
        m_contact2,
        m_email2,
        m_tshirt2,

    } = req.body;
    
    const total = 500;
    const paid = 0;
    const selected = false;

    let error = "";

    ProgrammingContest.findOne({ teamName: teamName, institution: institution, c_name: c_name, c_contact: c_contact })
        .then( (team) => {
        if (team) {
            error = "Team already exists with this name and contact number.";

            req.flash("error", error);
            res.redirect("Register-Team");
        }
        else {
            const team = new ProgrammingContest({
                teamName: teamName, 
                institution: institution, 
                c_name: c_name,
                c_contact: c_contact,
                c_email: c_email,
                c_tshirt : c_tshirt,
                
                m_name0: m_name0,
                m_contact0: m_contact0,
                m_email0: m_email0,
                m_tshirt0: m_tshirt0,
                
                m_name1: m_name1,
                m_contact1: m_contact1,
                m_email1: m_email1,
                m_tshirt1: m_tshirt1,
                
                m_name2: m_name2,
                m_contact2: m_contact2,
                m_email2: m_email2,
                m_tshirt2: m_tshirt2,
                
                total : total,
                paid : paid,
                selected : selected,
            });

            team.save()
                .then(() => {
                    console.log("Team Added: " + teamName);
                    error = "Team Added Successfully"
                    
                    req.flash("error", error);
                    res.redirect('Register-Team');
                })
                .catch((err)=>{
                    console.log(err)
                    error = "An Unexpected Error while Registering New Team.";

                    req.flash("error", error);
                    res.redirect("Register-Team");
                });
        }
    })
}

const getPCList = (req, res) =>{
    let Teams = [];
    let error = "";

    ProgrammingContest.find().then((data) => {
        Teams = data;

        res.render("Programming-Contest/List.ejs", { 
            username: username,
            teams: Teams,
            error: req.flash("error"),
        });
    })
    .catch(() => {
        error = "An Unexpected Error occured while fetching data."

        res.render("Programming-Contest/List.ejs", { 
            username: username,
            teams: Teams,
            error: req.flash("error", error),
        });
    })
}

const deletePC = (req, res) =>{
    const id = req.params.id;
    let error = ''

    console.log(id);

    ProgrammingContest.deleteOne({ _id: id }, (err) =>{
        if (err) {
            error = "Failed to delete data."
            req.flash('error', error);

            res.redirect('/ProgrammingContest/Team-list');
        }
        else{
            error = "Data Successfully deleted."
            req.flash('error', error);

            res.redirect('/ProgrammingContest/Team-list');
        }
    });
}

const paymentDone = (req, res) =>{
    const id = req.params.id;
    let error = ''

    console.log(id);
    console.log("I am here");

    ProgrammingContest.findOne({ _id: id }).then((team)=> {
        team.paid = team.total;
        
        team.save().then(()=>{
            error = "Payment Accepted Successfully."
            req.flash('error', error);

            console.log(error);
            res.redirect('/ProgrammingContest/Team-list');
        }).catch(()=>{
            error = "Unknown Error occured and Payment was denied."
            req.flash('error', error);

            console.log(error);
            res.redirect('/ProgrammingContest/Team-list');
        });
        }).catch(()=>{
        error = "Unknown Error occured and Team was not found."
        req.flash('error', error);

        console.log(error);
        res.redirect('/ProgrammingContest/Team-list');
    })
}

const teamSelected = (req, res) =>{
    const id = req.params.id;
    let error = ''

    console.log(id);
    console.log("I am hereee");

    ProgrammingContest.findOne({ _id: id }).then((team)=> {
        team.selected = true;
        
        team.save().then(()=>{
            error = "Team Selected Successfully."
            req.flash('error', error);

            console.log(error);
            res.redirect('/ProgrammingContest/Team-list');
        }).catch(()=>{
            error = "Unknown Error occured and Team was not Selected."
            req.flash('error', error);

            console.log(error);
            res.redirect('/ProgrammingContest/Team-list');
        });
        }).catch(()=>{
        error = "Unknown Error occured and Team was not found."
        req.flash('error', error);

        console.log(error);
        res.redirect('/ProgrammingContest/Team-list');
    })
}

module.exports = { getRegisterPC, getPCList, postRegisterPC, deletePC, paymentDone, teamSelected };