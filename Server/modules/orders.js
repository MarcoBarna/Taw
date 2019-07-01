"use strict"

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// ! STRANAMENTE CON required : true solo su questo file, CRASHA BOH????
let orderSchema = new Schema({
    orderNumber: {
        type: mongoose.SchemaTypes.Number,
        // required: true
    },
    item1List: { // 1 = Bevanda
        name: [mongoose.SchemaTypes.String],
    },
    item2List: { // 2 = Piatto
        name: [mongoose.SchemaTypes.String],
    },
    numberPeople: {
        number: mongoose.SchemaTypes.Number,
        // required: true
    },
    tableNumber: {
        table: mongoose.SchemaTypes.Number,
        // required: true
    },
    userNameWaiter: {
        username: mongoose.SchemaTypes.String,
        // required: true
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