const dotenv = require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const apiRouter = require('./apiRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);
server.use(cors());
server.use('/api', apiRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Node API Challenge</h2>`);
});

//custom middleware

function logger(req, res, next) {
  let timeStamp = new Date().toISOString();;
  console.log(`Method: ${req.method} / URL: ${req.url} / Time: ${timeStamp}`);
  next();
}

module.exports = server;
