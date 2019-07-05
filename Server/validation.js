"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');

exports.validateBody = function(user){
    const schema = {
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
        role: Joi.number().integer().min(1).max(4).required()
    }
    return Joi.validate(user, schema);
}

exports.validateTable = function(table){
    const schema = {
        tableNumber: Joi.number().integer().required(),
        seats: Joi.number().integer().min(2).required()
    }
    return Joi.validate(table, schema);
}

exports.validateItem = function(item){
    const schema = {
        code: Joi.number().integer().required(),
        name: Joi.string().required(),
        requiredTime: Joi.number().integer().min(1).required(),
        price: Joi.number().precision(2).required()
    }
    return Joi.validate(item, schema);
}

exports.validateOrder = function(order){
    const schema = {
        orderNumber : Joi.number().integer().min(0).required(),
        beverageList   : Joi.array(),
        dishList   : Joi.array(),
        numberPeople : Joi.number().integer().min(1).required(),
        tableNumber : Joi.number().integer().required(),
        userNameWaiter : Joi.string().required()
    }
    return Joi.validate(order, schema);
}