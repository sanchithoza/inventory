const mongoose = require('mongoose')
const productMasterSchema = new mongoose.Schema({
    productCategory: {
        type: String,
        required: true
    },
    productSubCategory: {
        type: String,
        required: true
    },
    productDiscription: {
        type: String,
        required: true
    },
    availableStock: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('productMaster', productMasterSchema)