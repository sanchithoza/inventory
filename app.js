const fastify = require("./main");
require('dotenv').config()
fastify.listen(process.env.PORT);