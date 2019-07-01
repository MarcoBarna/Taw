"use strict"

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let tableSchema = new Schema({
    tableNumber: {
        type: mongoose.SchemaTypes.Number,
        require: true
    },
    seats: {
        type: mongoose.SchemaTypes.Number,
        require: true
    },
    occupied: { // 1 - Cassiere, 2 - Cameriere, 3 - Cuoco, 4 - Barista
        type: mongoose.SchemaTypes.Boolean,
        require: true
    }
});

function getSchema() { return tableSchema; }
exports.getSchema = getSchema;

var tableModel;
function getModel() {
    if (!tableModel) {
        tableModel = mongoose.model('tables', getSchema());
    }
    return tableModel;
}
exports.getModel = getModel;

