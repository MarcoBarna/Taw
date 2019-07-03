"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectID = require('mongodb').ObjectID;
const result = require('dotenv').config({ path: __dirname + '/.env' }); // carica tutte le variabili presenti nel file .env
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const items = require("./modules/items");
const orders = require("./modules/orders");
const tables = require("./modules/tables");
const users = require("./modules/users");

// Connessione al database

/*
 Leggenda better comments
 * = informazioni importanti
 ! = allerta
 ? = domanda
 TODO = cosa da fare
 4/ = //// completato

 * NOME DEGLI ENDPOINT 

/api/v1/items
/api/v1/orders
/api/v1/tables
/api/v1/users

!1 - 
crea nuovo utente 
post /api//users

cancella utente
delete /api/users/:id
? login utente

!2 - 

modifica stato tavolo
put /api/tables/:id

aggiungi ordinazione piatti
post /api/orders/:id

aggiungi ordinazione bevande
post /api/orders/:id


? notifica cameriere

!3 - 


*/
// * LOGGING DELLE VARIE RICHIESTE
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
});


// * FUNCTIONS

function validateBody(user){
    const schema = {
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).required(),
        role: Joi.number().integer().min(1).max(4).required(),
    }
    return Joi.validate(user, schema);
}

function validateUsername(user){
    const schema = {
        username: Joi.string().min(5).required()
    }
    return Joi.validate(user, schema);
}

function validatePassword(user){
    const schema = {
        password: Joi.string().min(5).required()
    }
    return Joi.validate(user, schema);
}

function validateRole(user){
    const schema = {
        role: Joi.number().integer().min(1).max(4).required()
    }
    return Joi.validate(user, schema);
}




// *  API ROUTES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.route("/api/users").get((req,res) => {
    users.getModel().find()
        .then(allusers => {
            res.json({
                confirmation: "success",
                data: allusers
            })
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message : err.message
            })
        });

}).post((req, res, next) => {
    const {error} = validateBody(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    else{
        var nwuser = users.newUser(req.body);
        nwuser.save().then(data => {
            res.json({
                confirmation: "success",
                data: data
            })
        })
        
    }
    
});

app.route("/api/users/:username").delete((req,res,next) => {

    users.getModel().deleteOne({username: req.params.username})
    .then(() => {
        res.status(200).json({
            confirmation: "successfully deleted",
        })
    }).catch((err) => {
        next.json({
            confirmation: "fail",
            message : err.message
        })
    });
});
mongoose.connect('mongodb://localhost/ristdb').then(function onconnected() {
    console.log("Connected to MongoDB");
});
module.exports = app;
const server = http.createServer(app);
server.listen(port, () => console.info(`Server has started on ${port}`));