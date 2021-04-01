const fastify = require('fastify');
const sls = require('serverless-http')

function init() {
    const app = fastify();
    const db = require('./config/db')
    app.register(db)
    app.register(require('fastify-cors'), {
            origin: true
        })
        //database connection
        //routes
    app.register(require('./routes/master'));
    app.register(require('./routes/transaction'));
    app.get('/', (request, reply) => reply.send({ hello: 'world' }));
    return app;
}

if (require.main === module) {
    // called directly i.e. "node app"
    init().listen(3000, (err) => {
        if (err) console.error(err);
        console.log('server listening on 3000');
    });
} else {
    // required as a module => executed on aws lambda
    module.exports.server = sls(init);
}