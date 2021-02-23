const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    transactionDate: {
        type: Date,
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productMaster'
    },
    quantity: {
        type: Number,
        required: true
    },
    remark: {
        type: String
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('transactions', transactionSchema)