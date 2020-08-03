const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
  name: "johnsession",
  secret: "my secret",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require('../database/db-config'),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearinterval: 1000 * 60 *60
  })
    

  
};

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));



const usersRoute = require("../user/users_router");
const Auth = require("../auth/auth_router")

server.use("/api", usersRoute);
server.use("/api", Auth)

server.get("/api", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;