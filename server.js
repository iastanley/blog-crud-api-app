'use strict';
const express = require('express');
const morgan = require('morgan');

const app = express();

//import our blog Router
const blogRouter = require('./blogRouter.js');

//use morgan logging
app.use(morgan('common'));

//use router for blog
app.use('/blog-posts', blogRouter);

//listen for local port
// app.listen(process.env.port || 8080, () => {
//   console.log(`Server started. Listening at port ${process.env.port || 8080}`);
// });

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err);
    });
  });//end of Promise
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};
