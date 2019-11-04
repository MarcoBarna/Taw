/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
// eslint-disable-next-line no-unused-vars
var ObjectID = require("mongodb").ObjectID;
// eslint-disable-next-line no-unused-vars
const result = require("dotenv").config({
  path: __dirname + "/.env"
}); // carica tutte le variabili presenti nel file .env
const http = require("http");
const express = require("express"); // Express middleware
const cors = require("cors");
const validation = require("./validation"); // used for validating the imput
const app = express(); // initalizazion of express necessary for creating the API routes
const mongoose = require("mongoose"); // module for accessing the easy way :)  mongodb
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

// * HOME ENDPOINT
app.get("/", (req, res) => {
  res.status(200).json({
    api_version: "1.0",
    endpoints: ["users", "table", "items", "orders", "stats"]
  }); // json method sends a JSON response (setting the correct Content-Type) to the client
});

// * LOGIN
app.get(
  "/users/login",
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

app.get("/renew", auth, (req, res) => {
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
  .route("/users")
  .get(auth, (req, res) => {
    if (!users.newUser(req.user).HisCashier())
      return res.status(401).json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    users
      .getModel()
      .find()
      .then(allusers => {
        return res.status(200).json(allusers);
      })
      .catch(err => {
        return res.status(500).json({
          confirmation: "fail",
          message: err.message
        });
      });
  })
  .post(auth, (req, res) => {
    if (!users.newUser(req.user).HisCashier())
      return res.status(401).json({
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
            return res.status(200).json(data);
          })
          .catch(err => {
            return res.status(500).json({
              confirmation: "fail",
              message: err.message
            });
          });
      });
    }
  });

// * TABLE CREATION
app
  .route("/tables")
  .post(auth, (req, res) => {
    if (!users.newUser(req.user).HisCashier())
      return res.status(401).json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    const { error } = validation.validateTable(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      var newtable = tables.newTable(req.body);
      newtable.save().then(data => {
        socket.emitEvent("modified table");
        return res.status(200).json(data);
      });
    }
  })
  .get(auth, (req, res) => {
    // * TABLE LIST
    tables
      .getModel()
      .find()
      .then(alltables => {
        return res.status(200).json(alltables);
      })
      .catch(err => {
        return res.status(500).json({
          confirmation: "fail",
          message: err.message
        });
      });
  });

//* SINGLE TABLE
app
  .route("/tables/:id")
  .get(auth, (req, res) => {
    if (
      !users.newUser(req.user).HisCashier() &&
      !users.newUser(req.user).HisWaiter() &&
      !users.newUser(req.user).HisClient()
    )
      return res.status(401).json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    tables
      .getModel()
      .findOne({
        tableNumber: req.params.id
      })
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.status(500).json({
          confirmation: "fail",
          message: err.message
        });
      }); // * MODIFIED STATUS
  })
  .patch(auth, (req, res) => {
    if (
      !users.newUser(req.user).HisCashier() &&
      !users.newUser(req.user).HisWaiter() &&
      !users.newUser(req.user).HisClient()
    )
      return res.status(401).json({
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
        data.orderId = req.body.orderId;
        data.save();
        socket.emitEvent("modified table");
        return res.status(200).json({
          confirmation: "successfully modified"
        });
      })
      .catch(err => {
        return res.status(500).json({
          confirmation: "fail",
          message: err.message
        });
      });
  });

//* ITEM LIST
app
  .route("/items")
  .get(auth, (req, res) => {
    items
      .getModel()
      .find()
      .then(allitems => {
        return res.status(200).json(allitems);
      })
      .catch(err => {
        return res.status(500).json({
          confirmation: "fail",
          message: err.message
        });
      });
  })
  .post(auth, (req, res) => {
    // * CREATE NEW ITEM
    if (!users.newUser(req.user).HisCashier())
      return res.status(401).json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    const { error } = validation.validateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      var newitem = items.newItem(req.body);
      newitem.save().then(data => {
        return res.status(200).json(data);
      });
    }
  });

app.route("/items/:code").get(auth, (req, res) => {
  //* SEARCH ITEM
  items
    .getModel()
    .findOne({
      code: req.params.code
    })
    .then(singleItem => {
      return res.status(200).json(singleItem);
    })
    .catch(err => {
      return res.status(500).json({
        confirmation: "fail",
        message: err.message
      });
    });
});

//* ORDER LIST
app
  .route("/orders")
  .get(auth, (req, res) => {
    if (
      !users.newUser(req.user).HisWaiter() &&
      !users.newUser(req.user).HisCashier()
    )
      return res.status(401).json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    orders
      .getModel()
      .find()
      .then(allorders => {
        return res.status(200).json(allorders);
      })
      .catch(err => {
        return res.status(500).json({
          confirmation: "fail",
          message: err.message
        });
      });
  })
  .post(auth, (req, res) => {
    // * NEW ORDER
    if (!users.newUser(req.user).HisWaiter())
      return res.status(401).json({
        confirmation: "fail",
        message: "Unauthorized user"
      });
    const { error } = validation.validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      var neworder = orders.newOrder(req.body);
      const date = new Date();
      const dateStr =
        date.getDate() +
        ((date.getMonth() < 10 ? "0" : "") + `${date.getMonth() + 1}`) +
        date.getFullYear();
      neworder.date = parseInt(dateStr, 10);
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
                res.status(500).json({
                  confirmation: "fail",
                  message: err.message
                });
              });
            });
          socket.emitEvent("send order");
          return res.status(200).json(data);
        })
        .catch(err => {
          return res.status(500).json({
            confirmation: "fail",
            message: err.message
          });
        });
    }
  });

app.route("/orders/status/:id").patch(auth, (req, res) => {
  // * CLOSE AN ORDER AFTER ALL OF THE DISHES ARE PREPARED  || 0 = new order , 1 = order prepared, 2 = order paid |
  if (
    !users.newUser(req.user).HisCook() &&
    !users.newUser(req.user).HisCashier()
  )
    return res.status(401).json({
      confirmation: "fail",
      message: "Unauthorized user"
    });
  orders
    .getModel()
    .findOne({
      orderNumber: req.params.id
    })
    .then(data => {
      data.orderStatus = data.orderStatus + 1;
      data.markModified("orderStatus");
      socket.emitEvent("order prepared");
      data.save().catch(err => {
        return res.status(500).json({
          confirmation: "fail",
          message: err.message
        });
      });
    })
    .catch(err => {
      return res.status(500).json({
        confirmation: "fail",
        message: err.message
      });
    });
});

app.route("/orders/:id").get(auth, (req, res) => {
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
      return res.status(200).json(singleOrder);
    })
    .catch(err => {
      return res.status(500).json({
        confirmation: "fail",
        message: err.message
      });
    });
});

app.route("/orders/clients").post(auth, (req, res) => {
  // * NEW ORDER
  if (!users.newUser(req.user).HisClient())
    return res.status(401).json({
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
        socket.emitEvent("send order");
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.status(500).json({
          confirmation: "fail",
          message: err.message
        });
      });
  }
});

//* THIS MODIFIES THE SATE OF THE DISHES
app.route("/orders/dishes/:id").patch(auth, (req, res) => {
  if (!users.newUser(req.user).HisCook())
    return res.status(401).json({
      confirmation: "fail",
      message: "Unauthorized user",
      data: req.user
    });
  orders
    .getModel()
    .findOne({ orderNumber: req.params.id })
    .then(data => {
      data.dishState[req.body.index] = data.dishState[req.body.index] + 1;
      data.markModified("dishState");
      if (req.body.state === 1) socket.emitEvent("dish in preparation");
      else {
        socket.emitEvent("dish complete");
        stats
          .getModel()
          .findOne({ username: req.user.username })
          .then(cook => {
            cook.numberOfPlates += 1;
            items
              .getModel()
              .findOne({ code: data.dishList[req.body.index] })
              .then(dataItem => {
                cook.priceOfPlates += dataItem.price;
                cook
                  .save()
                  .catch(err => {
                    return res.status(500).json({
                      confirmation: "fail",
                      message: err.message
                    });
                  })
                  .catch(err => {
                    return res.status(500).json({
                      confirmation: "fail",
                      message: err.message
                    });
                  });
              });
          })
          .catch(err => {
            return res.status(500).json({
              confirmation: "fail",
              message: err.message
            });
          });
        var flag = 0;
        data.dishState.forEach(element => {
          if (element !== 2) flag = 1;
        });
        if (flag === 0)
          socket.emitEvent("dishes ready", {
            username: data.userNameWaiter,
            table: data.tableNumber
          }); // * call to the  waiter.
      }
      data
        .save()
        .then(() => {
          return res.status(200).json(data.dishState[req.body.index]);
        })
        .catch(err => {
          return res.status(500).json({
            confirmation: "fail",
            message: err.message
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        confirmation: "fail",
        message: err.message
      });
    });
});

//* THIS MODIFIES THE STATE OF PREPARATION OF THE BEVERAGES
app.route("/orders/beverages/:id").patch(auth, (req, res) => {
  if (!users.newUser(req.user).HisBartender())
    return res.status(401).json({
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
          socket.emitEvent("beverages ready", {
            username: data.userNameWaiter,
            table: data.tableNumber
          });
          console.log(data.userNameWaiter, data.tableNumber);
          return res.status(200).json(data.beverageState);
        })
        .catch(err => {
          return res.status(500).json({
            confirmation: "fail",
            message: err.message
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        confirmation: "fail",
        message: err.message
      });
    });
});

// * THIS RETURNS ALL OF THE TICKETS OF THE DAY
app.route("/orders/tickets/day/:date/:type").get(auth, (req, res) => {
  if (
    !users.newUser(req.user).HisCashier() &&
    !users.newUser(req.user).HisCook() &&
    !users.newUser(req.user).HisBartender()
  )
    return res.status(401).json({
      confirmation: "fail",
      message: "Unauthorized user"
    });
  orders
    .getModel()
    .find({ date: req.params.date, orderStatus: req.params.type })
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(err => {
      return res.status(500).json({
        confirmation: "fail",
        message: err.message
      });
    });
});

app.route("/orders/tickets/:id").get(auth, (req, res) => {
  if (!users.newUser(req.user).HisCashier() &&
      !users.newUser(req.user).HisClient()
  )
    return res.status(401).json({
      confirmation: "fail",
      message: "Unauthorized user"
    });
  orders
    .getModel()
    .findOne({ orderNumber: req.params.id })
    .then(data => {
      var arrayList = [];
      var total = 2 * data.numberPeople;
      if (data.beverageList !== [])
        data.beverageList.forEach(element => {
          arrayList.push(element);
        });
      if (data.dishList !== [])
        data.dishList.forEach(element => {
          arrayList.push(element);
        });
      items
        .getModel()
        .find({ code: { $in: arrayList } })
        .then(result => {
          arrayList.forEach(element => {
            result.forEach(res => {
              if (element === res.code) total += res.price;
            });
          });
          return res.status(200).json(total);
        })
        .catch(err => {
          return res.status(500).json({
            confirmation: "fail",
            message: err.message
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        confirmation: "fail",
        message: err.message
      });
    });
});

app.route("/stats").get(auth, (req, res) => {
  if (!users.newUser(req.user).HisCashier())
    return res.status(401).json({
      confirmation: "fail",
      message: "Unauthorized user"
    });

  stats
    .getModel()
    .find()
    .then(allstats => {
      return res.status(200).json(allstats);
    })
    .catch(err => {
      return res.status(200).json({
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
  .connect(
    "mongodb+srv://admin:admin@pleasework-apavp.mongodb.net/ristdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(
    function onconnected() {
      console.log("Connected to MongoDB");

      module.exports = app;
      const server = http.createServer(app);
      server.listen(process.env.PORT || 8080, () =>
        console.log("HTTP Server started on port " + process.env.PORT || 8080)
      );
      socket = new io.Socket(server);
      console.log("Socket.io Server Ready");

      // * ADMIN CREATION
      var nwuser = users.newUser({
        username: "admin",
        password: "admin",
        role: 1
      });
      nwuser.setPassword("admin");
      nwuser.save(function(err) {
        if (!err) {
          var nwstat = stats.newstats({
            username: "admin"
          });
          nwstat.save();
        } else console.log("admin alredy created");
      });
      // * WAITER CREATION
      var nwuser2 = users.newUser({
        username: "waiter",
        password: "waiter",
        role: 2
      });
      nwuser2.setPassword("waiter");
      nwuser2.save(function(err) {
        if (!err) {
          var nwstat = stats.newstats({
            username: "waiter"
          });
          nwstat.save();
        } else console.log("waiter alredy created");
      });
      // * COOK CREATION
      var nwuser3 = users.newUser({
        username: "cook",
        password: "cook",
        role: 3
      });
      nwuser3.setPassword("cook");
      nwuser3.save(function(err) {
        if (!err) {
          var nwstat = stats.newstats({
            username: "cook"
          });
          nwstat.save();
        } else console.log("cook alredy created");
      });
      // * BARTENDER CREATION
      var nwuser4 = users.newUser({
        username: "bartender",
        password: "bartender",
        role: 4
      });
      nwuser4.setPassword("bartender");
      nwuser4.save(function(err) {
        if (!err) {
          var nwstat = stats.newstats({
            username: "bartender"
          });
          nwstat.save();
        } else console.log("bartender alredy created");
      });
    },
    function onrejected() {
      console.log("Unable to connect to MongoDB");
      process.exit(-2);
    }
  );
