const fastify = require('fastify')({
    logger: false
}); //Bring in Fastify
const PORT = process.env.PORT || 3000;
({
    logger: true
})
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
const start = async() => {
    try {

        await fastify.listen(PORT)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();