const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//  table, price, order
const tableSchema = new Schema({
    restaurantEmail: {type: String, required: true},
    tableNumber: {type: Number, required: true},
    tableOrder: Array,
    tableOrderNumber: Number,
    tableAllOrders: Array,
    tableOverallPrice: Number,
    tablePeople: Number
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
