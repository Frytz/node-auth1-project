require("dotenv").config();

const server = require("./api/server.js");

const Port = process.env.PORT || 6000;
server.listen(Port, () => console.log(`\n** Running on port ${Port} **\n`));