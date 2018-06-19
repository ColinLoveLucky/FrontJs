let confiig = require('./config.json');
module.exports = function () {
    var greet = document.createElement('div');
    greet.textContent = confiig.greetText;
    return greet;
}