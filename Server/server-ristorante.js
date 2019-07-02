"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectID = require('mongodb').ObjectID;
const result = require('dotenv').config({ path: __dirname + '/.env' }); // carica tutte le variabili presenti nel file .env
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
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


// *  API ROUTES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// app.use((req,res,next) => {
//     res.status(404).send("The resource you are looking for is not here sorry :( ")
// });

app.route("/api/users").get((req,res) => {
    res.send("You have requested a user") // ! MOMENTANEO
}).post(async (req, res, next) => { // ! MOMENTANEO
    // try{
        var nwuser = users.newUser(req.body);
        nwuser.save()
    // }catch (error){
    //     res.status(500).send(error);
    // };
});

app.get('/api/users', (req, res) =>{
    
});

app.get('/api/users/:username', (req, res) =>{
    res.send(`You have requested a user ${req.params.username}`)
});
mongoose.connect('mongodb://localhost/ristdb').then(function onconnected() {
    console.log("Connected to MongoDB");
});
module.exports = app;
const server = http.createServer(app);
server.listen(port, () => console.info(`Server has started on ${port}`));