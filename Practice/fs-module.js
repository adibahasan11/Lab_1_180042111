const fs = require("fs");

fs.writeFile('./Contents/demoFile.txt', 'We are learning NodeJS.', (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Done Successfully");
    }
});

fs.writeFileSync('./Contents/demoFileSync.txt', 'We are learning Javascript.');
fs.appendFileSync('./Contents/demoFileSync.txt', ' We are learning NodeJS.');

fs.rename('./Contents/demoFileSync.txt', './Contents/RenamedFileSync.txt', (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Renamed Successfully");
    }
});

//Prints the contect in Hexa
fs.readFile('./Contents/demoFile.txt', (err, data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(data);
    }
});

fs.readFile('./Contents/demoFile.txt', 'utf-8', (err, data)=>{
    if(err){
        console.log(err);
    }
    else{
        //console.log(data);
        fs.appendFileSync('./Contents/demoFile.txt', ' Is this a Synchronous Process?');
        
        fs.readFile('./Contents/demoFile.txt', 'utf-8', (err, data)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(data);
            }
        });
    }
});

//Delete File
fs.unlink('./Contents/demoFile.txt', (err, data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('File Deleted Successfully.');
    }
});