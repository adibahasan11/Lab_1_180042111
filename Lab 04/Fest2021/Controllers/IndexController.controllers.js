const getHome = (req, res) =>{
    res.render("Home.ejs");
}

const errorPage = (req, res) => {
    res.render("Error-Page/Page-not-Found.ejs");
}

module.exports = { getHome, errorPage };