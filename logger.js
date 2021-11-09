function log (name) {
    console.log('This name is '+name)
}

function welcome() {
    console.log('Welcome to my application at functionup')
}

const url = "https://www.google.com/";
module.exports.logging = log;
module.exports.printWelcomeMessage = welcome;
module.exports.loggerEndpoint = url;
