"use strict"
Object.defineProperty(exports, "__esModule", { value: true });
const result = require('dotenv').config({ path: __dirname + '/.env' }); // carica tutte le variabili presenti nel file .env
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT;

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
post /api/v1/users

cancella utente
delete /api/v1/users/:id
? login utente

!2 - 

modifica stato tavolo
put /api/v1/tables/:id

aggiungi ordinazione piatti
post /api/v1/orders/:id

aggiungi ordinazione bevande
post /api/v1/orders/:id


? notifica cameriere

!3 - 


*/
// * LOGGING DELLE VARIE RICHIESTE
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
});

// app.use((req,res,next) => {
//     res.status(404).send("The resource you are looking for is not here sorry :( ")
// });

app.get('/api/v1/users', (req, res) =>{
    res.send("You have requested a user")
});

app.get('/api/v1/users/:username', (req, res) =>{
    res.send(`You have requested a user ${req.params.username}`)
});

module.exports = app;
const server = http.createServer(app);
server.listen(port, () => console.info(`Server has started on ${port}`));