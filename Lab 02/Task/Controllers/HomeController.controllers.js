const getHome = (req, res) =>{
    res.sendFile("Home.html", {root:"./Views"});
}

const errorPage = (req, res) => {
    res.sendFile("Page-not-Found.html", {root:"./Views/Error-Page"});
}

module.exports = { getHome, errorPage };