const boom = require('boom')
const transactions = require('../models/transaction')
async function routes(fastify, options) {

    /*get all Master Record Routes*/
    fastify.get('/transactions', async(request, reply) => {
        //return newpost
        try {
            await transactions.find().exec((err, result) => {
                if (err) {
                    return reply.send(`Error reading ${err}`)
                }
                reply.send(result)
            });

        } catch (err) {
            throw boom.boomify(err)
        }
    })
    fastify.post('/addTransaction', async(request, reply) => {
        try {
            let trans = new transaction(request.body);
            let newTransaction = await trans.save();
            console.log(newTransaction);
            await reply.send(newTransaction)
                //return newpost
        } catch (err) {
            throw boom.boomify(err)
        }
        // await reply.send(request.body.hey)
    })
}
module.exports = routes