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

exports.validateUsername = function(user){
    const schema = {
        username: Joi.string().min(5).required()
    }
    return Joi.validate(user, schema);
}

exports.validatePassword = function(user){
    const schema = {
        password: Joi.string().min(5).required()
    }
    return Joi.validate(user, schema);
}

exports.validateRole = function(user){
    const schema = {
        role: Joi.number().integer().min(1).max(4).required()
    }
    return Joi.validate(user, schema);
}

exports.validateTable = function(table){
    const schema = {
        tableNumber: Joi.number().integer().required()
    }
    return Joi.validate(table, schema);
}

exports.validateItem = function(item){
    const schema = {
        name: Joi.string().required(),
        requiredTime: Joi.number().integer().required(),
        itemType: Joi.number().integer().required(),
        price: Joi.number().required()
    }
    return Joi.validate(item, schema);
}
