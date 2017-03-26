const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server.js');

const should = chai.should();
chai.use(chaiHttp);

describe('Blog API', function() {
  before(function() {
    return runServer();
  });
  after(function() {
    return closeServer();
  });

  //test for GET request
  it('should list blog posts on GET', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        //assertions for GET
      });
  }); //end of GET tests

  //test for POST request
  it('should add blog post on POST', function() {
      //create newPost object
      const newPost = {};
      return chai.request(app)
        .post('/blog-posts')
        .send(newPost)
        .then(function(res) {
          //assertions for POST
        });
  }); //end of POST tests

  //test for PUT request
  it('should update post on PUT', function() {
    //create an updated data object
    const updateData = {};
  }); //end of PUT tests

  //test for DELETE request
  it('should delete post on DELETE', function() {

  }); //end of DELETE tests

}); //end of describe
