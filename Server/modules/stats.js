"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

//* Numeri che cominciano per 1 = Bevande
//* Numeri che cominciano per 2 = Piatti
let statsSchema = new Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    numberOfClients: { // * Waiter
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    numberOfPlates: { // * Cook
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    priceOfPlates: { // * Cook
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    numberOfOrders: { // * Waiter
        type: mongoose.SchemaTypes.Number,
        default: 0
    }
});

function getSchema() { return statsSchema; }
exports.getSchema = getSchema;

function newstats(data) {
    var _statsmodel = getModel();
    var stats = new _statsmodel(data);
    return stats;
}
exports.newstats = newstats;

var statsModel;
function getModel() {
    if (!statsModel) {
        statsModel = mongoose.model('stats', getSchema());
    }
    return statsModel;
}
exports.getModel = getModel;

