"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
var ObjectID = require("mongodb").ObjectID;
const result = require("dotenv").config({
  path: __dirname + "/.env"
}); // carica tutte le variabili presenti nel file .env
const http = require("http");
const express = require("express"); // Express middleware
const cors = require("cors");
const validation = require("./validation"); // used for validating the imput
const app = express(); // initalizazion of express necessary for creating the API routes
const mongoose = require("mongoose"); // module for accessing the easy way :)  mongodb 
// mongoose.Promise = require('bluebird');
const bodyParser = require("body-parser"); // necessary for express, (it parses the query)
const jwt = require("express-jwt"); // makes express aware of the presence of jsonwebtoken
const passport = require("passport"); // used for basic login auth
const passportHTTP = require("passport-http"); // schema for passport
const port = process.env.PORT;
const jsonwebtoken = require("jsonwebtoken"); // json web tocken used for auth
const items = require("./modules/items"); // collection db of items
const orders = require("./modules/orders"); // collection db of orders
const tables = require("./modules/tables"); // collection db of tables
const users = require("./modules/users"); // collection db of users
const stats = require("./modules/stats"); // collection db of stats for each special user ("Cooks and Waiters")
const io = require("./socket");

var auth = jwt({
  secret: process.env.JWT_SECRET
});
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
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

// *  API ROUTES
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

// Semaphore

var socket;

// ! ADMIN TEST
app.post("/api/test", (req, res) => {
  var nwuser = users.newUser(req.body);
  nwuser.setPassword(req.body.password);
  nwuser.save();
  return res.status(200).json({
    confirmation: "success",
    data: nwuser
  });
});

// * HOME ENDPOINT
app.get("/", (req, res) => {
  res.status(200).json({
    api_version: "1.0",
    endpoints: [
      "/api/users",
      "/api/table",
      "/api/items",
      "/api/orders",
      "/api/stats"
    ]
  }); // json method sends a JSON response (setting the correct Content-Type) to the client
});

// * LOGIN
app.get(
  "/api/users/login",
  passport.authenticate("basic", {
    session: false
  }),
  (req, res) => {
    //genero il token
    var tokendata = {
      username: req.user.username,
      role: req.user.role
    };
    console.log("Login granted. Generating token");
    var token_signed = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    return res.status(200).json({
      confirmation: "success",
      token: token_signed
    });
  }
);

// ! RENEW TOKEN, CI VA L'AUTH?
app.get("/api/users/renew", auth, (req, res) => {
  var tokendata = req.user;
  delete tokendata.iat;
  delete tokendata.exp;
  console.log("Renewing token for user " + JSON.stringify(tokendata));
  var token_signed = jsonwebtoken.sign(tokendata, process.env.JWT_SECRET, {
    expiresIn: "24h"
  });
  return res.status(200).json({
    confirmation: "success",
    token: token_signed
  });
});

// * GET ALL USER LIST
app
  .route("/api/users")
  .get(auth, (req, res) => {
    if (!users.newUser(req.user).HisCashier())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    users
      .getModel()
      .find()
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
  })
  .post(auth, (req, res) => {
    if (!users.newUser(req.user).HisCashier())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    const { error } = validation.validateBody(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      var nwuser = users.newUser(req.body);
      nwuser.setPassword(req.body.password);
      nwuser.save(function(err) {
        if (err) return res.send("Error, username already exist");
        var nwstat = stats.newstats(req.body);
        nwstat
          .save()
          .then(data => {
            socket.emitEvent("modified user");
            res.json({
              confirmation: "success",
              data: data
            });
          })
          .catch(err => {
            res.json({
              confirmation: "fail",
              message: err.message
            });
          });
      });
    }
  });

//* DELETE USER
app.route("/api/users/:username").delete(auth, (req, res, next) => {
  if (!users.newUser(req.user).HisCashier())
    return res.json({
      confirmation: "fail",
      message: "Unauthorized user"
    });
  users
    .getModel()
    .deleteOne({
      username: req.params.username
    })
    .then(() => {
      socket.emitEvent("modified user");
      res.status(200).json({
        confirmation: "successfully deleted"
      });
    })
    .catch(err => {
      next.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

// * TABLE CREATION
app
  .route("/api/tables")
  .post(auth, (req, res) => {
    if (!users.newUser(req.user).HisCashier())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    const { error } = validation.validateTable(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      var newtable = tables.newTable(req.body);
      newtable.save().then(data => {
        socket.emitEvent("modified table");
        res.json({
          confirmation: "success",
          data: data
        });
      });
    }
  })
  .get(auth, (req, res) => {
    // * TABLE LIST
    tables
      .getModel()
      .find()
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
app
  .route("/api/tables/:id")
  .patch(auth, (req, res) => {
    if (
      !users.newUser(req.user).HisCashier() &&
      !users.newUser(req.user).HisWaiter()
    )
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    tables
      .getModel()
      .findOne({
        tableNumber: req.params.id
      })
      .then(data => {
        data.occupied = !data.occupied;
        data.save();
        socket.emitEvent("modified table");
        res.status(200).json({
          confirmation: "successfully modified"
        });
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: err.message
        });
      });
  })
  .delete(auth, (req, res) => {
    if (!users.newUser(req.user).HisCashier())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    tables
      .getModel()
      .deleteOne({
        tableNumber: req.params.id
      })
      .then(() => {
        socket.emitEvent("modified table");
        res.status(200).json({
          confirmation: "successfully deleted"
        });
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: err.message
        });
      });
  });

//* ITEM LIST
app
  .route("/api/items")
  .get(auth, (req, res) => {
    if (!users.newUser(req.user).HisCashier())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    items
      .getModel()
      .find()
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
  })
  .post(auth, (req, res) => {
    // * CREATE NEW ITEM
    if (!users.newUser(req.user).HisCashier())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
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
app
  .route("/api/items/:code")
  .delete(auth, (req, res) => {
    if (!users.newUser(req.user).HisCashier())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    items
      .getModel()
      .deleteOne({
        code: req.params.code
      })
      .then(() => {
        res.status(200).json({
          confirmation: "successfully deleted"
        });
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: err.message
        });
      });
  })
  .get(auth, (req, res) => {
    //* SEARCH ITEM
    items
      .getModel()
      .findOne({
        code: req.params.code
      })
      .then(singleItem => {
        res.json({
          confirmation: "success",
          data: singleItem
        });
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: err.message
        });
      });
  });

//* ORDER LIST
app
  .route("/api/orders")
  .get(auth, (req, res) => {
    if (users.newUser(req.user).HisWaiter())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    orders
      .getModel()
      .find()
      .then(allorders => {
        res.json({
          confirmation: "success",
          data: allorders
        });
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: err.message
        });
      });
  })
  .post(auth, (req, res) => {
    // * NEW ORDER
    if (!users.newUser(req.user).HisWaiter())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    const { error } = validation.validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      var neworder = orders.newOrder(req.body);
      neworder.date = new Date();
      neworder.dishList.forEach(element => {
        neworder.dishState.push(0);
      });
      neworder
        .save()
        .then(data => {
          stats
            .getModel()
            .findOne({
              username: data.userNameWaiter
            })
            .then(user => {
              user.numberOfClients += data.numberPeople;
              user.numberOfOrders++;

              user.save().catch(err => {
                res.json({
                  confirmation: "fail",
                  message: err.message
                });
              });
            });
          socket.emitEvent("send order");
          res.json({
            confirmation: "success",
            order: data
          });
        })
        .catch(err => {
          res.json({
            confirmation: "fail",
            message: err.message
          });
        });
    }
  })
  .patch(auth, (req, res) => {
    //* ADD A NEW ORDER TO AN EXISTING ONE
    if (!users.newUser(req.user).HisWaiter())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    const { error } = validation.validateExistingOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      orders
        .getModel()
        .findOne({
          orderNumber: req.body.orderNumber
        })
        .then(data => {
          const beverageList = req.body.beverageList;
          if (beverageList.length > 0) {
            beverageList.forEach(element => {
              data.beverageList.push(element);
            });
            data.beverageState = false;
            data.markModified("beverageState");
          }
          const dishList = req.body.dishList;
          if (dishList.length > 0) {
            dishList.forEach(element => {
              data.dishList.push(element);
              data.dishState.push(0);
            });
          }
          // data.markModified('dishList');
          data.save();
          var index = 0;
          var i = 0;
          while (data.dishState[i] != 0) {
            index++;
            i++;
          }
          socket.emitEvent("send order");
          return res.status(200).json({
            confirmation: "succesfully modified",
            beverageList,
            dishList,
            orderNumber: data.orderNumber,
            index: index
          });
        })
        .catch(err => {
          res.json({
            confirmation: "fail",
            message: err.message
          });
        });
    }
  });

// * DELETE SINGLE ORDER
app
  .route("/api/orders/:id")
  .delete(auth, (req, res) => {
    if (!users.newUser(req.user).HisCashier())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    orders
      .getModel()
      .deleteOne({
        orderNumber: req.params.id
      })
      .then(() => {
        res.status(200).json({
          confirmation: "successfully deleted"
        });
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: err.message
        });
      });
  })
  .get(auth, (req, res) => {
    // * FIND SINGLE ORDER
    if (users.newUser(req.user).HisWaiter())
      return res.json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    orders
      .getModel()
      .findOne({
        orderNumber: req.params.id
      })
      .then(singleOrder => {
        res.json({
          confirmation: "success",
          data: singleOrder
        });
      })
      .catch(err => {
        res.json({
          confirmation: "fail",
          message: err.message
        });
      });
  });

// ! TESTARE QUESTA API RICORDANDOSI DI INSERIRE I CODICI GIUSTI IN ITEMS
app.route("/api/orders/dishes/:id").patch(auth, (req, res) => {
  if (!users.newUser(req.user).HisCook())
    return res.json({
      confirmation: "fail",
      message: "Unauthorized user",
      data: req.user
    });
  orders
    .getModel()
    .findOne({ orderNumber: req.params.id })
    .then(data => {
      data.dishState[req.body.index] = req.body.state;
      data.markModified("dishState");
      if (req.body.state === 1) socket.emitEvent("dish in preparation");
      else {
        socket.emitEvent("dish complete");
        stats
          .getModel()
          .findOne({ username: req.user.username })
          .then(cook => {
            console.log(cook.numberOfPlates);
            cook.numberOfPlates += 1;
            console.log(cook.numberOfPlates);
            items
              .getModel()
              .findOne({ code: data.dishList[req.body.index] })
              .then(dataItem => {
                cook.priceOfPlates += dataItem.price;
                cook
                  .save()
                  .catch(err => {
                    res.json({
                      confirmation: "fail",
                      message: err.message
                    });
                  })
                  .catch(err => {
                    res.json({
                      confirmation: "fail",
                      message: err.message
                    });
                  });
              });
          })
          .catch(err => {
            res.json({
              confirmation: "fail",
              message: err.message
            });
          });
        var flag = 0;
        data.dishState.forEach(element => {
          if (element !== 2) flag = 1;
        });
        if (flag === 0) socket.emitEvent("dishes ready"); // * call to the  waiter.
      }
      data
        .save()
        .then(() => {
          res.status(200).json({
            confirmation: "successfully modified",
            dishState: data.dishState[req.body.index]
          });
        })
        .catch(err => {
          res.json({
            confirmation: "fail",
            message: err.message
          });
        });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

app.route("/api/orders/beverages/:id").patch(auth, (req, res) => {
  if (!users.newUser(req.user).HisBartender())
    return res.json({
      confirmation: "fail",
      message: "Unauthorized user"
    });
  orders
    .getModel()
    .findOne({ orderNumber: req.params.id })
    .then(data => {
      data.beverageState = true;
      data.markModified("beverageState");
      data
        .save()
        .then(() => {
          socket.emitEvent("beverages ready");
          res.status(200).json({
            confirmation: "successfully modified",
            dishState: data.beverageState
          });
        })
        .catch(err => {
          res.json({
            confirmation: "fail",
            message: err.message
          });
        });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

app.route("/api/orders/tickets/:id").get(auth, (req, res) => {
  if (!users.newUser(req.user).HisCashier())
    return res.json({
      confirmation: "fail",
      message: "Unauthorized user"
    });
  orders
    .getModel()
    .findOne({ orderNumber: req.params.id })
    .then(data => {
      var arrayList = [];
      var total = 2 * data.numberPeople;
      if(data.beverageList !== [])
        data.beverageList.forEach(element => {
          arrayList.push(element)
        })
      if(data.dishList !== [])
        data.dishList.forEach(element => {
          arrayList.push(element)
        })
      items.getModel().find({code : { $in: arrayList}})
      .then(result => {
        arrayList.forEach(element => {
          result.forEach(res => {
            if(element === res.code)
              total += res.price;
          })
        })
        return res.json({
          confirmation : "success",
          total : total,
          order : arrayList,
          dataToPrint : result
        })
      })
      .catch(err => {
        res.json({
          confirmation: "fail 2",
          message: err.message
        });
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});
app.route("/api/stats").get(auth, (req, res) => {
  if (!users.newUser(req.user).HisCashier())
    return res.json({
      confirmation: "fail",
      message: "Unauthorized user"
    });

  stats
    .getModel()
    .find()
    .then(allstats => {
      res.json({
        confirmation: "success",
        data: allstats
      });
    })
    .catch(err => {
      res.json({
        confirmation: "fail",
        message: err.message
      });
    });
});

// Configure HTTP basic authentication strategy
// trough passport middleware.
passport.use(
  new passportHTTP.BasicStrategy(function(username, password, done) {
    // Delegate function we provide to passport middleware
    // to verify user credentials
    console.log("New login attempt from " /*.green*/ + username);
    users.getModel().findOne(
      {
        username
      },
      (err, users) => {
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
      }
    );
  })
);

mongoose
  .connect("mongodb://localhost/ristdb", {
    useNewUrlParser: true
  })
  .then(
    function onconnected() {
      console.log("Connected to MongoDB");

      module.exports = app;
      const server = http.createServer(app);
      server.listen(port, () =>
        console.info(`Server has started on port: ${port}`)
      );
      socket = new io.Socket(server);
      console.log("Socket.io Server Ready");
    },
    function onrejected() {
      console.log("Unable to connect to MongoDB");
      process.exit(-2);
    }
  );
