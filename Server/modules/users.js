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

userSchema.methods.getRole = function(){
    return this.role;
}

userSchema.methods.setCashier = function(){
    this.role = 1;
}
userSchema.methods.setWaiter = function(){
    this.role = 2;
}
userSchema.methods.setCook = function(){
    this.role = 3;
}
userSchema.methods.setBartender = function(){
    this.role = 4;
}


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