"use strict"
Object.defineProperty(exports, "__esModule", {
    value: true
});
var ObjectID = require('mongodb').ObjectID;
const result = require('dotenv').config({
    path: __dirname + '/.env'
}); // carica tutte le variabili presenti nel file .env
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


var auth = jwt({ secret: process.env.JWT_SECRET});
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
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// * LOGIN
app.get("/api/users/login", passport.authenticate('basic', {
    session: false
}), (req, res) => {
    //genero il token
    var tokendata = {
        username: req.user.username,
        role: req.user.role
    };
    console.log("Login granted. Generating token");
    var token_signed = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, {
        expiresIn: '30m'
    });
    return res.status(200).json({
        confirmation: "success",
        token: token_signed
    });
});

// ! RENEW TOKEN, CI VA L'AUTH?
app.get('/api/users/renew', auth, (req, res) => {
    var tokendata = req.user;
    delete tokendata.iat;
    delete tokendata.exp;
    console.log("Renewing token for user " + JSON.stringify(tokendata));
    var token_signed = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return res.status(200).json({
        confirmation: "success",
        token: token_signed
    });
});

// * GET ALL USER LIST
app.route("/api/users").get(auth, (req, res) => {
    
    if(!users.newUser(req.user).HisCashier())
        return res.json({
            confirmation: "fail",
            message : "Unauthorized user",
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
                message: err.message
            });
        });

}).post((req, res) => { //* NEW USER SIGNUP
    const { error } = validation.validateBody(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
        var nwuser = users.newUser(req.body);
        nwuser.setPassword(req.body.password);
        nwuser.save(function(err){
            if(err) return res.send('Error, username already exist')
            return res.json({
                    confirmation: "success"
                });
         });
    }
});

//* DELETE USER
app.route("/api/users/:username").delete(auth, (req, res, next) => {
    
    if(!users.newUser(req.user).HisCashier())
        return res.json({
            confirmation: "fail",
            message : "Unauthorized user",
        });
            users.getModel().deleteOne({
            username: req.params.username
        })
        .then(() => {
            res.status(200).json({
                confirmation: "successfully deleted",
            })
        }).catch((err) => {
            next.json({
                confirmation: "fail",
                message: err.message
            });
        });
});

// * TABLE CREATION
app.route("/api/tables").post(auth, (req, res) => {
    // !check controllo che id tavolo sia unico
    const { error } = validation.validateTable(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
        var newtable = tables.newTable(req.body);
        newtable.save().then(data => {
            res.json({
                confirmation: "success",
                data: data
            });
        });
    }
}).get(auth, (req, res) => { // * TABLE LIST
    tables.getModel().find()
        .then(alltables => {
            res.json({
                confirmation: "success",
                data: alltables
            });
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message: err.message
            });
        });
});


//* TABLE MODIFIED STATUS
app.route("/api/tables/:id").put(auth, (req, res) => {

    tables.getModel().findOne({
            tableNumber: req.params.id
        })
        .then((data) => {
            console.log(data.occupied)
            data.occupied = !data.occupied;
            console.log(data.occupied)
            data.save()
            res.status(200).json({
                confirmation: "successfully modified"
            });

        }).catch((err) => {
            res.json({
                confirmation: "fail",
                message: err.message
            });
        });
}).delete(auth, (req, res) => { //* DELETE SINGLE TABLE
    tables.getModel().deleteOne({
            tableNumber: req.params.id
        })
        .then(() => {
            res.status(200).json({
                confirmation: "successfully deleted"
            });
        }).catch((err) => {
            res.json({
                confirmation: "fail",
                message: err.message
            });
        });
});

//* ITEM LIST
app.route("/api/items").get(auth, (req, res) => {
    items.getModel().find()
        .then(allitems => {
            res.json({
                confirmation: "success",
                data: allitems
            });
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message: err.message
            });
        });
}).post(auth, (req, res) => { //* NEW ITEM
    const { error } = validation.validateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
        var newitem = items.newItem(req.body);
        newitem.save().then(data => {
            res.json({
                confirmation: "success",
                data: data
            });
        });

    }
});

//* DELETE SINGLE ITEM
app.route("/api/items/:code").delete(auth, (req, res) => {
    items.getModel().deleteOne({
            code: req.params.code
        })
        .then(() => {
            res.status(200).json({
                confirmation: "successfully deleted",
            })
        }).catch((err) => {
            res.json({
                confirmation: "fail",
                message: err.message
            });
        })
}).get(auth, (req, res) => { //* SEARCH ITEM
    items.getModel().findOne({
            code: req.params.code
        })
        .then(singleItem => {
            res.json({
                confirmation: "success",
                data: singleItem
            })
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message: err.message
            })
        });
});

//* ORDER LIST
app.route("/api/orders").get(auth, (req, res) => {
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
                message: err.message
            })
        });
}).post(auth, (req, res) => { // * NEW ORDER
    const { error } = validation.validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
        var neworder = orders.newOrder(req.body);
        neworder.save().then(data => {
            res.json({
                confirmation: "success",
                data: data
            })
        }).catch((err) => {
            res.json({
                confirmation: "fail",
                message: err.message
            })
        });
    }
});

// * DELETE SINGLE ORDER
app.route("/api/orders/:id").delete(auth, (req, res) => {
    orders.getModel().deleteOne({
            orderNumber: req.params.id
        })
        .then(() => {
            res.status(200).json({
                confirmation: "successfully deleted",
            })
        }).catch((err) => {
            res.json({
                confirmation: "fail",
                message: err.message
            })
        });
}).get(auth, (req, res) => { // * FIND SINGLE ORDER
    orders.getModel().findOne({
            orderNumber: req.params.id
        })
        .then(singleOrder => {
            res.json({
                confirmation: "success",
                data: singleOrder
            })
        })
        .catch(err => {
            res.json({
                confirmation: "fail",
                message: err.message
            })
        });
})

// Configure HTTP basic authentication strategy 
// trough passport middleware.
passport.use(new passportHTTP.BasicStrategy(function (username, password, done) {
    // Delegate function we provide to passport middleware
    // to verify user credentials 
    console.log("New login attempt from " /*.green*/ + username);
    users.getModel().findOne({
        username
    }, (err, users) => {
        if (err) {
            return done({
                statusCode: 500,
                error: true,
                errormessage: err
            });
        }
        if (!users) {
            return done({
                statusCode: 500,
                error: true,
                errormessage: "Invalid user"
            });
        }
        if (users.validatePassword(password)) {
            return done(null, users);
        }
        return done({
            statusCode: 500,
            error: true,
            errormessage: "Invalid password"
        });
    });
}));


mongoose.connect('mongodb://localhost/ristdb', {
    useNewUrlParser: true
}).then(function onconnected() {
    console.log("Connected to MongoDB");
});
module.exports = app;
const server = http.createServer(app);
server.listen(port, () => console.info(`Server has started on port: ${port}`));