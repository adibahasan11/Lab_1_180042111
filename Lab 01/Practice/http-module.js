const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url == '/'){
        res.write("<h1>Hello</h1>");
        res.end();
    }
    else if (req.url == '/home'){
        res.write("<h1>Welcome to the Home Page</h1>");
        res.end();
    }
    else{
        res.write("<h1>This Page does not exist.</h1> <a href= '/'>Go Back to Base</a>");
        res.end();
    }
});

module.exports = { server };