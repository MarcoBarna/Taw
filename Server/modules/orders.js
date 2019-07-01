"use strict"

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let orderSchema = new Schema({
    orderNumber: {
        type: mongoose.SchemaTypes.Number,
        require: true
    },
    item1List: { // 1 = Bevanda
        name: [mongoose.SchemaTypes.String],
        require: true
    },
    item2List: { // 2 = Piatto
        name: [mongoose.SchemaTypes.String],
        require: true
    },
    numberPeople: {
        number: mongoose.SchemaTypes.Number,
        require: true // non può essere 0
    },
    tableNumber: {
        table: mongoose.SchemaTypes.Number,
        require: true
    },
    userNameWaiter: {
        username: mongoose.SchemaTypes.String,
        require: true
    }
});

function getSchema() { return orderSchema; }
exports.getSchema = getSchema;

var orderModel;
function getModel() {
    if (!orderModel) {
        orderModel = mongoose.model('orders', getSchema());
    }
    return orderModel;
}
exports.getModel = getModel;