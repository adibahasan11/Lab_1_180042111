const ProgrammingContest = require("../Models/ProgContest.model");

var uuid = require('uuid');

var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./LocalStorage');

const username = localStorage.getItem("username");

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "ictfest2021@outlook.com",
        pass: "ictfest123456789"
    }
});

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

    var verificationCode = uuid.v1();
    console.log(verificationCode);

    let error = "";

    ProgrammingContest.findOne({ teamName: teamName, institution: institution }).then( (team) => {
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
                verificationCode : verificationCode,
            });

            team.save()
                .then(() => {
                    console.log("Team Added: " + teamName);
                    error = "Team Added Successfully"

                    const emails = [c_email, m_email0, m_email1, m_email2];
                        
                    const options = {
                        from: "ictfest2021@outlook.com",
                        to: emails,
                        subject: "Registration is Successful!",
                        text: "Dear " + teamName + ", \n" + 
                        "Congratulations! Your Registration to Programming Contest in ICT Fest, 2021 is successful.\n" 
                        + "Your unique code is " + verificationCode + "."
                    }

                    transporter.sendMail(options, function(err, info){
                        if (err){
                            console.log(err);
                            return;
                        }
                        console.log("Sent: " + info.response);
                    });
                    //} 
                    
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

const getEditPC = (req, res) =>{
    const id = req.params.id;
    let Team = [];
    let error = ''

    console.log(id);

    ProgrammingContest.findOne({ _id: id }).then((data) => {
        Team = data;

        res.render("Programming-Contest/Edit.ejs", { 
            username: username,
            team: Team,
            error: req.flash("error"),
        });
    })
    .catch(() => {
        error = "An Unexpected Error occured while fetching data."

        res.render("Programming-Contest/Edit.ejs", { 
            username: username,
            team: Team,
            error: req.flash("error", error),
        });
    })
    
}

const postEditPC = (req, res) =>{
    const id = req.params.id;
    let error = ''

    console.log(id);

    ProgrammingContest.findOne({ _id: id }).then( (team) => {
        if (team) {
            const { 
                teamName,
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

            team.teamName = teamName;
            team.institution = institution;

            team.c_name = c_name;
            team.c_contact = c_contact;
            team.c_email = c_email;
            team.c_tshirt = c_tshirt;

            team.m_name0 = m_name0;
            team.m_contact0 = m_contact0;
            team.m_email0 = m_email0;
            team.m_tshirt0 = m_tshirt0;

            team.m_name1 = m_name1;
            team.m_contact1 = m_contact1;
            team.m_email1 = m_email1;
            team.m_tshirt1 = m_tshirt1;

            team.m_name2 = m_name2;
            team.m_contact2 = m_contact2;
            team.m_email2 = m_email2;
            team.m_tshirt2 = m_tshirt2;

            team.save().then(()=>{
                error = "Team Data was edited successfully.";
                req.flash('error', error);
    
                console.log(error);
                res.redirect('/ProgrammingContest/Team-list');
            }).catch(()=>{
                error = "Unknown Error occured and Data was not Edited."
                req.flash('error', error);
    
                console.log(error);
                res.redirect('/ProgrammingContest/Team-list');
            });
        }
        else {
            error = "Unknown Error occured and Data was not Edited."
            req.flash('error', error);
    
            console.log(error);
            res.redirect('/ProgrammingContest/Team-list');
        }
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

    ProgrammingContest.findOne({ _id: id }).then((team)=> {
        team.selected = true;
        
        team.save().then(()=>{
            error = "Team Selected Successfully."
            req.flash('error', error);

            const emails = [team.c_email, team.m_email0, team.m_email1, team.m_email2];

            const options = {
                to: emails,
                from: "ictfest2021@outlook.com",
                subject: "Your Team is Selected!",
                text: "Dear " + team.teamName + ", \n" + 
                    "Congratulations! Your Team has been selected for Programming Contest in ICT Fest, 2021."
            }

            transporter.sendMail(options, function(err, info){
                if (err){
                    console.log(err);
                    return;
                }
                console.log("Sent: " + info.response);
            });

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

module.exports = { getRegisterPC, getPCList, postRegisterPC, deletePC, paymentDone, teamSelected, getEditPC, postEditPC };