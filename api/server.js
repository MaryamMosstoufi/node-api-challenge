const express = require('express');
const helmet = require('helmet');

const apiRouter = require('./apiRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());
//server.use(logger);
server.use('/api', apiRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Node API Challenge</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//   let timeStamp = new Date().toLocaleDateString;
//   console.log(`Method: ${req.method} / URL: ${req.url} / Time: ${timeStamp}`);
//   next();
// }

module.exports = server;
