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
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        const expectedKeys = ['title', 'content', 'author', 'publishDate', 'id'];
        res.body.forEach(post => {
          post.should.be.a('object');
          post.should.include.keys(expectedKeys);
        });
      });
  }); //end of GET tests

  //test for POST request
  it('should add blog post on POST', function() {
      //create newPost object
      const newPost = {title: 'A', author: 'Illana', content: 'hello', publishDate: 'July 14'};
      const expectedKeys = ['title', 'content', 'author', 'publishDate', 'id'];
      return chai.request(app)
        .post('/blog-posts')
        .send(newPost)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(expectedKeys);
          res.body.id.should.not.be.null;
          //check that res.body object is deep equal to newPost with id
          res.body.should.deep.equal(Object.assign(newPost, {id: res.body.id}));
        });
  }); //end of POST tests

  //test for PUT request
  it('should update post on PUT', function() {
    //create an updated data object
    const updateData = {title: 'A', author: 'Illana', content: 'hello', publishDate: 'July 14'};
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        updateData.id = res.body[0].id;
        return chai.request(app)
          .put(`/blog-posts/${updateData.id}`)
          .send(updateData);
      })
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.deep.equal(updateData);
      });
  }); //end of PUT tests

  //test for PUT request with bad id
  //this is currently NOT WORKING
  it('should fail on bad id to PUT', function() {
    //create an updated data object
    const updateData = {id: 'AAA', title: 'A', author: 'Illana', content: 'hello', publishDate: 'July 14'};
    return chai.request(app)
      .put('/blog-posts/XXX')
      .send(updateData)
      .then(function(res) {
        res.should.have.status(400);
      });
  });

  //test for DELETE request
  it('should delete post on DELETE', function() {
    return chai.request(app)
      .get('/blog-posts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/blog-posts/${res.body[0].id}`);
      }).then(function(res) {
        res.should.have.status(204);
      });
  }); //end of DELETE tests

}); //end of describe
