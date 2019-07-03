"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let tableSchema = new Schema({
    tableNumber: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    seats: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    occupied: { // 1 - Cassiere, 2 - Cameriere, 3 - Cuoco, 4 - Barista
        type: mongoose.SchemaTypes.Boolean,
        default: false
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

function newTable(data) {
    var _tablemodel = getModel();
    var table = new _tablemodel(data);
    return table;
}
exports.newTable = newTable;

exports.setOccupation = function (boolean){
    this.occupied = boolean;
}
