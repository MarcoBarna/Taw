"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let itemSchema = new Schema({
    nome: {
        type: mongoose.SchemaTypes.String,
        required: true
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

var itemModel;
function getModel() {
    if (!itemModel) {
        itemModel = mongoose.model('items', getSchema());
    }
    return itemModel;
}
exports.getModel = getModel;

