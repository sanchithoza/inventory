const fastify = require('fastify');
const PORT = 3000;
const app = fastify();

const db = require('./config/db')
app.register(db)
app.register(require('fastify-cors'), {
        origin: true
    })
    //database connection
    //routes
app.get('/', (request, reply) => reply.send({ hello: 'world' }));
app.register(require('./routes/master'));
app.register(require('./routes/transaction'));

// Declare a route
//Funtion To run the server

if (require.main === module) {
    // called directly i.e. "node app"
    app.listen(3000, (err) => {
        if (err) console.error(err);
        console.log('server listening on 3000');
    });
} else {
    // required as a module => executed on aws lambda
    module.exports = app;
}