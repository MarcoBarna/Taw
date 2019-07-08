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
const jwt = require("express-jwt");
const passport = require("passport");
const passportHTTP = require("passport-http");
const port = process.env.PORT;
const jsonwebtoken = require("jsonwebtoken");
const items = require("./modules/items");
const orders = require("./modules/orders");
const tables = require("./modules/tables");
const users = require("./modules/users");


var auth = jwt({secret: process.env.JWT_SECRET });
// Connessione al database

/*
 Leggenda better comments
 * = informazioni importanti
 ! = allerta
 ? = domanda
 TODO = cosa da fare
 4/ = //// completato

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

app.get("/api/login", passport.authenticate('basic', {session: false}), (req,res,next) => {
    var token = {
        username: req.user.username,
        role: req.user.role,
    };
    var tokenjwt = jsonwebtoken.sign(token, process.env.JWT_SECRET,{ expiresIn: '4h' });
    return res.status(200).json({confirmation: "Login granted", token: tokenjwt});
});

// ! TEST 

app.post('/api/login', (req,res) => {
    // test user
    const user = {
        username: "test123",
        password: "testtest",
        role: 1
    }
    jsonwebtoken.sign({user}, process.env.JWT_SECRET, (err,token) => {
        res.json({
            token
        });
    });
});

// * RITORNO LISTA UTENTI
app.route("/api/users").get(auth, (req,res,next) => {
    if(users.newUser(req.user).getRole() != 1)
        return next.json({
            confirmation: "Forbidden access"
        });

    users.getModel().find()
        .then(allusers => {
            res.json({
                confirmation: "success",
                data: allusers
            });
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message : err.message
            });
        });

}).post(auth, (req, res, next) => { //* CREAZIONE UTENTE
    if(users.newUser(req.user).getRole() != 1)
        return next.json({
            confirmation: "Forbidden access"
        });
    const {error} = validation.validateBody(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    else{
        var nwuser = users.newUser(req.body);
        nwuser.setPassword(req.body.password);
        nwuser.save().then(data => {
            res.json({
                confirmation: "success",
                data: data
            });
        }); 
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
app.route("/api/items/:code").delete((req,res,next) => {
    items.getModel().deleteOne({code: req.params.code})
    .then(() => {
        res.status(200).json({
            confirmation: "successfully deleted",
        })
    }).catch((err) => {
        res.json({
            confirmation: "fail",
            message : err.message
        })
    })
}).get((req,res,next) => { //* RICERCA PRODOTTO
    items.getModel().findOne({code: req.params.code})
        .then(singleItem => {
            res.json({
                confirmation: "success",
                data: singleItem
            })
        })
        .catch(err => {
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
}).post((req,res,next) => { // * INSERIMENTO ORDINI
    const {error} = validation.validateOrder(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    else{
        var neworder = orders.newOrder(req.body);
        neworder.save().then(data =>{
            res.json({
                confirmation: "success",
                data: data
            })
        }).catch((err) => {
            res.json({
                confirmation: "fail",
                message : err.message
            })
        });
    }
});

app.route("/api/orders/:id").delete((req,res,next) => {
    orders.getModel().deleteOne({orderNumber: req.params.id})
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
}).get((req,res,next) => {
    orders.getModel().findOne({orderNumber: req.params.id})
        .then(singleOrder => {
            res.json({
                confirmation: "success",
                data: singleOrder
            })
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message : err.message
            })
        });
})

// Configure HTTP basic authentication strategy 
// trough passport middleware.
passport.use(new passportHTTP.BasicStrategy(function (username, password, done) {
    // Delegate function we provide to passport middleware
    // to verify user credentials 
    console.log("New login attempt from " /*.green*/ + username);
    user.getModel().findOne({ username: username }, (err, user) => {
        if (err) {
            return done({ statusCode: 500, error: true, errormessage: err });
        }
        if (!user) {
            return done({ statusCode: 500, error: true, errormessage: "Invalid user" });
        }
        if (user.validatePassword(password)) {
            return done(null, user);
        }
        return done({ statusCode: 500, error: true, errormessage: "Invalid password" });
    });
}));

mongoose.connect('mongodb://localhost/ristdb', { useNewUrlParser: true }).then(function onconnected() {
    console.log("Connected to MongoDB");
});
module.exports = app;
const server = http.createServer(app);
server.listen(port, () => console.info(`Server has started on port: ${port}`));