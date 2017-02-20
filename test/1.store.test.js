import Store from '../src/models/Store';

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'
const should = chai.should()

chai.use(chaiHttp);

describe('Stores', () => {
  before((done) => {
    Store.remove({}, (err) => {
      done();
    })
  })
  it('it should GET all the stores', (done) => {
    chai.request(server)
      .get('/api/stores')
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      })
  })
  it('it should not POST a store without name', (done) => {
    let store = new Store({email:"store@store.com"});
    chai.request(server)
      .post('/api/stores')
      .send(store)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        done();
      })
  })
  let storeId;
  it('it should POST a store', (done) => {
    let store = new Store({_id: "store1", name: "store1", email:"store@store.com"});
    chai.request(server)
      .post('/api/stores')
      .send(store)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        storeId = res.body._id;
        done();
      })
  })
  it('it should GET a store by id', (done) => {
    chai.request(server)
      .get('/api/stores/' + storeId)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        done();
      })
  })
  it('it should GET all the stores', (done) => {
    chai.request(server)
      .get('/api/stores')
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      })
  })
  it('it should PUT a certain store by id', (done) => {
    chai.request(server)
      .put('/api/stores/' + storeId)
      .send({name: "STORE111111"})
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql("STORE111111");
        res.body.should.have.property('email').eql("store@store.com");
        done();
      })
  })
  it('it should DELETE a certain store', (done) => {
    chai.request(server)
      .delete('/api/stores/' + storeId)
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
  })
  it('it should GET all the stores', (done) => {
    chai.request(server)
      .get('/api/stores')
      .end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      })
  })
})
