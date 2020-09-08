const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // force mongoose to use ES6 Promise

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};


before((done) => {

    mongoose.connect('mongodb://localhost/identity_system_test', options );
    mongoose.connection
        .once('open', () => {done();})
        .on('error', (error) => {
            console.warn('Warning: ', error);
        });


});



// making a Test Hook : this is a middleware, lol..
beforeEach((done) =>{
   mongoose.connection.collections.identity_system_test.drop(() => {
// ready to run next test
done();
   });

});