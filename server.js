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
app.listen(process.env.port || 8080, () => {
  console.log(`Server started. Listening at port ${process.env.port || 8080}`);
});
