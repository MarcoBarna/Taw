"use strict"

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        require: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        require: true
    },
    role: { // 1 - Cassiere, 2 - Cameriere, 3 - Cuoco, 4 - Barista
        type: mongoose.SchemaTypes.Number,
        require: true
    }
});

function getSchema() { return userSchema; }
exports.getSchema = getSchema;

var userModel;
function getModel() {
    if (!userModel) {
        userModel = mongoose.model('users', getSchema());
    }
    return userModel;
}
exports.getModel = getModel;

