const Hello = () => {
    console.log("Hello World!");
}

const name = "Adiba Hasan";

module.exports = { Hello, name };

//Another way to Export
module.exports.hello = () => {
    console.log("Hello!");
}

module.exports.Name = "Adiba";

//Print module information
//console.log(module); 