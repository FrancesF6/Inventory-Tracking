const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let inventorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    unit_cost: {
        type: Number,
        required: true,
        min: [0, "Unit Cost cannot be negative"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity cannot be negative"]
    }
});



module.exports = mongoose.model("Inventory", inventorySchema);   // collection: inventories