'use strict';
const express = require('express');
const bodyParser = require('body-parser');

//set up express router instance and body-parser middleware
const router = express.Router();
const jsonParser = bodyParser.json();

//import model
const {BlogPosts} = require('./models');

//add sample posts to BlogPosts
BlogPosts.create('First day', 'This was my first day', 'Illana', Date(16, 7, 21));
BlogPosts.create('Last day', 'Glad to be done!', 'Illana');

//function for validating required fields
const validateFields = (fields, req) => {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (!(field in req.body)) {
      const message = `Missing '${field}' in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
}

//get route
router.get('/', (req, res) => {
  console.log('GET request made');
  //return as json all of the blog posts
  res.status(200).json(BlogPosts.get());
});

router.get('/:id', (req, res) => {
  console.log('GET request made');
  //return as json all of the blog posts
  res.status(200).json(BlogPosts.get(req.params.id));
});

//post route
router.post('/', jsonParser, (req, res) => {
  console.log('POST request made');
  const requiredFields = ['title', 'content', 'author'];
  //accept a json request
  //validate json request
  validateFields(requiredFields, req);
  //create a new blog post based on json request
  //send blog that was posted
  res.status(201).json(BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate));
});

//update route
router.put('/:id', jsonParser, (req, res) => {
  console.log('PUT request made');
  //validate id field
  //BlogPosts.update() will only require id field
  const requiredFields = ['id'];
  validateFields(requiredFields, req);
  //validate that req.params.id and req.body.id are equal
  if (req.params.id !== req.body.id) {
    const message = 'router parameter id and request body id do not match';
    console.error(message);
    res.status(400).send(message);
  }
  //update post id with data from req.body
  const newPost = {
    id: req.params.id
  }
  if (req.body.title) { newPost.title = req.body.title }
  if (req.body.content) { newPost.content = req.body.content }
  if (req.body.author) { newPost.author = req.body.author }
  if (req.body.publishDate) { newPost.publishDate = req.body.publishDate }

  res.status(200).json(BlogPosts.update(newPost));
});

// delete route
router.delete('/:id', (req, res) => {
  console.log(`Post id: ${req.params.id} was deleted.`);
  if (BlogPosts.delete(req.params.id) !== 'error') {
    res.status(204).end();
  } else {
    res.status(400).end();
  }

});

//export router for import into server.js
module.exports = router;
