const express = require('express');
const app = express();
const http = require('http');
const routes = require("./routes");
const bodyParser = require('body-parser');
const router = require("express").Router();
const httpServer = http.createServer(app);
var engine = require('ejs-locals');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('./config');
const passport = require('passport');
const mongoose = require('./middleware/mongoose');
const path = require('path');
const cors = require('cors');

app.engine('ejs', engine);
app.set('view cache', false);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({
   limit: "50mb",
   extended: true
}));
app.use(bodyParser.json({limit: "50mb"}));

app.use(session({
   store: new RedisStore({
      host: 'localhost',
      port: 6379,
      ttl: 260
   }),
   secret: config.SECRET,
   resave: false,
   saveUninitialized: true
}));

app.use(cors());

// Passport:
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "./public")));

app.use("/", routes);

app.use((req, res, next) => {
   var err = new Error("Not Found");
   err.status = config.STATUS_CODE.NOT_FOUND;
   next(err);
});

httpServer.listen(config.PORT);
require("./middleware/passport")(passport);