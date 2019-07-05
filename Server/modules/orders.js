"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const items = require("./items");
var Schema = mongoose.Schema;
// 1|
let orderSchema = new Schema({
    orderNumber: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        unique: true
    },
    beverageList: { // 1 = Bevanda
        type: [mongoose.SchemaTypes.Number]
    },
    dishList: { // 2 = Piatto
        type: [mongoose.SchemaTypes.Number]
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
