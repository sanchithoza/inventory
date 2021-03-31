const fastifyPlugin = require('fastify-plugin')
const mongoose = require('mongoose')
    // Connect to DB
async function dbConnector(fastify, options) {
    try {
        const url = "mongodb+srv://gujtexMongo:Gujtex.2021@cluster0.unndp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
            //        const url = "mongodb://localhost:27017/inventory_db"
        const db = await mongoose
            .connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
        console.log("Database is connected")
        fastify.decorate('mongo', db)
    } catch (err) {
        console.log(err)
    }
}
module.exports = fastifyPlugin(dbConnector)