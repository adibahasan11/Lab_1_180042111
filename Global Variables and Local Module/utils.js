const HelloFunc = require('./helloWorld');

//Prints the Function, what are exported from helloWorld
console.log(HelloFunc);

//Calls the Function
HelloFunc.Hello();

//Prints the variable
console.log(HelloFunc.name);

//setInterval
setInterval(()=>{
    HelloFunc.Hello();
}, 1000);

//setTimeout
setTimeout(()=>{
    console.log(HelloFunc.name);
}, 5000);
