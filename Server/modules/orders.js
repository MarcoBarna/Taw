"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
// 1|
let orderSchema = new Schema({
    orderNumber: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        unique: true
    },
    beverageList: { // 1 = Beverage
        type: [mongoose.SchemaTypes.Number]
    },
    dishList: { // 2 = DISH
        type: [mongoose.SchemaTypes.Number]
    },
    dishState: { // 0 = DISH NOT IN PREPARATION, 1 = DISH IN PREPARATION, 2 = DISH COMPLETE
        type: [mongoose.SchemaTypes.Number]
    },
    beverageState: { // 0 = DISH NOT IN PREPARATION, 1 = DISH IN PREPARATION, 2 = DISH COMPLETE
        type: Boolean,
        default: false
    },
    numberPeople: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    tableNumber: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    date: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    orderStatus: {
        type: mongoose.SchemaTypes.Number,
        default: 0
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