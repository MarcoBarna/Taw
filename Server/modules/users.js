"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        trim: true,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        trim: true,
        required: true
    },
    role: { // 1 - Cassiere, 2 - Cameriere, 3 - Cuoco, 4 - Barista
        type: mongoose.SchemaTypes.Number,
        required: true
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

function newUser(data) {
    var _usermodel = getModel();
    var user = new _usermodel(data);
    return user;
}
exports.newUser = newUser;