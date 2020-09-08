
let constants = require('./constants');


const speaker = require('../language/'+constants.APP_LANGUAGE); // dont remove const from this guy: save our memory



function  speaks (module,message) {

return speaker[module][message];


}


module.exports = speaks;