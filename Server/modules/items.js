"use strict"

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let itemSchema = new Schema({
    nome: {
        type: mongoose.SchemaTypes.String,
        require: true
    },
    durataPreparazione: {
        type: mongoose.SchemaTypes.Number,
        require: true
    },
    itemType: { // 1 è bevanda, 2 è piatto
        type: mongoose.SchemaTypes.Number,
        require: true
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        require: true
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

