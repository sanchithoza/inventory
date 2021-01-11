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
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productMaster'
    },
    quantity: {
        type: Number,
        required: true
    },
    remark: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('transactions', transactionSchema)