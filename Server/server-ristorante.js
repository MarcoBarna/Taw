"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectID = require('mongodb').ObjectID;
const result = require('dotenv').config({ path: __dirname + '/.env' }); // carica tutte le variabili presenti nel file .env
const http = require('http');
const https = require('https');
const express = require('express');
const cors = require('cors');
const validation = require('./validation');
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

// * RITORNO LISTA UTENTI
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

}).post((req, res, next) => { //* CREAZIONE UTENTE
    const {error} = validation.validateBody(req.body);
    if(error) return res.status(400).send(error.details[0].message);
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

//* CANCELLAZIONE UTENTI
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

// * CREAZIONE DI UN TAVOLO
app.route("/api/tables").post((req,res,next) => {
    // !check controllo che id tavolo sia unico
    const {error} = validation.validateTable(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    else{
        var newtable = tables.newTable(req.body);
        newtable.save().then(data =>{
            res.json({
                confirmation: "success",
                data: data
            })
        })
    }
}).get((req,res,next) =>{ //* LISTA TAVOLI
    tables.getModel().find()
        .then(alltables => {
            res.json({
                confirmation: "success",
                data: alltables
            })
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message : err.message
            })
        });
});


//* MODIFICA STATO DI UN TAVOLO
app.route("/api/tables/:id").put((req,res,next) =>{
    
    tables.getModel().findOne({tableNumber: req.params.id})
    .then((data) => {
        console.log(data.occupied)
        data.occupied = !data.occupied;
        console.log(data.occupied)
        data.save()
        res.status(200).json({
            confirmation: "successfully modified"
        })

    }).catch((err) => {
        res.json({
            confirmation: "fail",
            message : err.message
        })
    });
}).delete((req,res,next) => { //* CANCELLAZIONE DI UN TAVOLO
    tables.getModel().deleteOne({id: req.params.tableNumber})
    .then(() => {
        res.status(200).json({
            confirmation: "successfully deleted"
        })
    }).catch((err) => {
        res.json({
            confirmation: "fail",
            message : err.message
        })
    });
})

//* LISTA ITEM
app.route("/api/items").get((req,res) => {
    items.getModel().find()
        .then(allitems => {
            res.json({
                confirmation: "success",
                data: allitems
            })
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message : err.message
            })
        });
}).post((req, res, next) => { //* CREAZIONE DI UN ITEM
    const {error} = validation.validateItem(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    else{
        var newitem = items.newItem(req.body);
        newitem.save().then(data => {
            res.json({
                confirmation: "success",
                data: data
            })
        })
        
    }  
});

//* CANCELLAZIONE PRODOTTO(ITEM)
app.route("/api/items/:name").delete((req,res,next) => {
    items.getModel().deleteOne({name: req.params.name})
    .then(() => {
        res.status(200).json({
            confirmation: "successfully deleted",
        })
    }).catch((err) => {
        res.json({
            confirmation: "fail",
            message : err.message
        })
    });
});


//* LISTA ORDINI
app.route("/api/orders").get((req,res,next) => {
    orders.getModel().find()
        .then(allorders => {
            res.json({
                confirmation: "success",
                data: allorders
            })
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message : err.message
            })
        });
}).post((req,res,next) => {
    const {error} = validation.validateOrder(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    else{
        var neworder = orders.newOrder(req.body);
        neworder.save().then(data =>{
            res.json({
                confirmation: "success",
                data: data
            })
        });
    }
});

mongoose.connect('mongodb://localhost/ristdb', { useNewUrlParser: true }).then(function onconnected() {
    console.log("Connected to MongoDB");
});
module.exports = app;
const server = http.createServer(app);
server.listen(port, () => console.info(`Server has started on port: ${port}`));