"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

//* Numeri che cominciano per 1 = Bevande
//* Numeri che cominciano per 2 = Piatti
let itemSchema = new Schema({
  code: {
    type: mongoose.SchemaTypes.Number,
    required: true,
    unique: true
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  requiredTime: {
    type: mongoose.SchemaTypes.Number,
    required: true
  },
  price: {
    type: mongoose.SchemaTypes.Number,
    required: true
  }
});
function getSchema() {
  return itemSchema;
}
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
    itemModel = mongoose.model("items", getSchema());
  }
  return itemModel;
}
exports.getModel = getModel;
