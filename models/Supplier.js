const  mongoose = require("mongoose")
const {Schema} = mongoose

const supplierSchema = new Schema({
    name: {type: String, required:true},
    address: {type: String, required:true},
    logo:{type: String},
    product:[String],
});

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;