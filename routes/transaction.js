const boom = require('boom')
const _ = require('lodash')
const productMaster = require('./../models/productMaster')
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
    fastify.get('/transactions/:type', async(request, reply) => {
        //return newpost
        try {
            await transactions.find({ transactionType: request.params.type }).exec((err, result) => {
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
            let trans = new transactions(request.body);
            let newTransaction = await trans.save();
            await updateStock(request.body.quantity, request.body.transactionType, request.body.product);
            await reply.send(newTransaction)
                //return newpost
        } catch (err) {
            throw boom.boomify(err)
        }
    })
    fastify.get('/stockStatement', async(request, reply) => {
        try {
            let stockSummery = await productMaster.find()
            console.log(stockSummery);
            reply.send(stockSummery)
        } catch (error) {
            throw boom.boomify(error)
        }
    })
}

let updateStock = async(quantity, type, id) => {
    try {
        if (type == "Inward") {
            await productMaster.findOneAndUpdate({ _id: id }, {
                $inc: { availableStock: quantity }
            })
        }
        if (type == "Outward") {
            await productMaster.findOneAndUpdate({ _id: id }, {
                $inc: { availableStock: -(quantity) }
            })
        }
    } catch (error) {
        throw boom.boomify(error)
    }
}
module.exports = routes