const http = require('http');
const fs = require('fs');

const about = fs.readFileSync('./HTML/about.html', 'utf-8');

const blog = fs.readFileSync('./HTML/blog.html', 'utf-8');

const contact = fs.readFileSync('./HTML/contact.html', 'utf-8');

const index = fs.readFileSync('./HTML/index.html', 'utf-8');

const pricing = fs.readFileSync('./HTML/pricing.html', 'utf-8');

const services = fs.readFileSync('./HTML/services.html', 'utf-8');

const work = fs.readFileSync('./HTML/work.html', 'utf-8');

const server = http.createServer((req, res) => {
    if (req.url == '/'){
        //res.writeHead( {"Content-Type" : "text/plain"} )
        res.write(index);
        res.end();
    }
    else if (req.url == '/blog'){
        res.write(blog);
        res.end();
    }
    else if (req.url == '/contact'){
        res.write(contact);
        res.end();
    }
    else if (req.url == '/about'){
        res.write(about);
        res.end();
    }
    else if (req.url == '/pricing'){
        res.write(pricing);
        res.end();
    }
    else if (req.url == '/services'){
        res.write(services);
        res.end();
    }
    else if (req.url == '/blog'){
        res.write(blog);
        res.end();
    }
    else if (req.url == '/work'){
        res.write(work);
        res.end();
    }
    else{
        res.write("<h1>This Page does not exist.</h1> <a href= '/'>Go Back to Base</a>");
        res.end();
    }
});
module.exports = { server };