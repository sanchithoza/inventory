const fastifyImp = require("fastify");
const fastify = fastifyImp({
    logger: true
});
fastify.get("/", async(request, reply) => {
    // Some sort of request validation
    reply.send({ text: "Hello, " + (request.query.name || "Friend") });
});

const db = require('./config/db')
fastify.register(db)
fastify.register(require('fastify-cors'), {
    origin: true
})

//database connection
//routes
fastify.register(require('./routes/master'));
fastify.register(require('./routes/transaction'));

// Declare a route
//Funtion To run the server
module.exports = fastify