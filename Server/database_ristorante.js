"use scrict"
const mongoose = require("mongoose");
var Schema = mongoose.Schema;


// DEFINIZIONE DEGLI SCHEMI DEL DATABASE
var piattiSchema = new Schema({
    nome: String,
    durataPreparazione: Number
});

var bevandeSchema = new Schema({
    nome: String,
    durataPreparazione: Number
});

var tavoliSchema = new Schema({
    numeroTavolo: Number,
    posti: Number,
    statoOccupazione: Boolean
});

var ordiniSchema = new Schema({
    numeroOrdine: Number,
    listaPiatti: [String],
    listaBevande: [String],
    numeroPersone: Number,
    numeroTavolo: Number,
    idCameriere: Number
});

var piattiOrdineSchema = new Schema({
    numeroOrdine: Number,
    nome: String,
    quantita: Number
});

var bevandeOrdineSchema = new Schema({
    numeroOrdine: Number,
    nome: Number,
    quantita: Number
});

var cassieriSchema = new Schema({
    username: String,
    password: String
});

var cuochiSchema = new Schema({
    username: String,
    password: String
});

var baristiSchema = new Schema({
    username: String,
    password: String
});

var camerieriSchema = new Schema({
    username: String,
    password: String
});

// CREAZIONE DEI MODELLI

var Piatti = mongoose.model('Piatti',piattiSchema);
var Bevande = mongoose.model('Bevande',bevandeSchema);
var Tavoli = mongoose.model('Tavoli',tavoliSchema);
var Ordini = mongoose.model('Ordini',ordiniSchema);
var PiattiOrdine = mongoose.model('PiattiOrdine',piattiOrdineSchema);
var BevandeOrdine = mongoose.model('BevandeOrdine',bevandeOrdineSchema);
var Cassiere = mongoose.model('Cassiere',cassieriSchema);
var Cuochi = mongoose.model('Cuochi',cuochiSchema);
var Baristi = mongoose.model('Baristi',baristiSchema);
var Cameriere = mongoose.model('Cameriere',camerieriSchema);


