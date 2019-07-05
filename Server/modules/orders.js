"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const items = require("./items");
var Schema = mongoose.Schema;

let orderSchema = new Schema({
    orderNumber: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        unique: true
    },
    item1List: { // 1 = Bevanda
        type: [mongoose.SchemaTypes.String]
    },
    item2List: { // 2 = Piatto
        type: [mongoose.SchemaTypes.String]
    },
    numberPeople: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    tableNumber: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    userNameWaiter: {
        type: mongoose.SchemaTypes.String,
        required: true
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

function newOrder(data) {
    var _ordermodel = getModel();
    var order = new _ordermodel(data);
    return order;
}
exports.newOrder = newOrder;
