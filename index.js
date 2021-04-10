const fastify = require('fastify')({
    logger: true
}); //Bring in Fastify
const PORT = 3000;

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
        //console.log(`here :${PORT }`);
        await fastify.listen(PORT)
        fastify.log.info(`server listening on ${PORT}`)
    } catch (err) {
        console.log(`Error :${PORT }`);
        fastify.log.error(err)
            //      process.exit(1)

    }
}
start();