const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    "Retailer": {type: String, required: true},
    "BoughtTime": {type: Date, required:true},// timestamp
    "Cost": {type: Number, required: true},// cost of purchase
    "PaymentMethod": String,
    "Category": String,
}, {timestamps:true});

module.exports = new mongoose.model('Purchase', PurchaseSchema);