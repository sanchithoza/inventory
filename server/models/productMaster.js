const mongoose = require('mongoose')
const productMasterSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productSubCategory: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('productMaster', productMasterSchema)