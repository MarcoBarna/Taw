"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let itemSchema = new Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    requiredTime: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    itemType: { // 1 è bevanda, 2 è piatto
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
});

function getSchema() { return itemSchema; }
exports.getSchema = getSchema;

function newItem(data) {
    var _itemmodel = getModel();
    var item = new _itemmodel(data);
    return item;
}
exports.newItem = newItem;

var itemModel;
function getModel() {
    if (!itemModel) {
        itemModel = mongoose.model('items', getSchema());
    }
    return itemModel;
}
exports.getModel = getModel;

