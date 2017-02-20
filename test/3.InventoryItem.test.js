import Store from '../src/models/Store'
import InventoryItem from '../src/models/InventoryItem'

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'
const should = chai.should()

chai.use(chaiHttp)

describe('InventoryItem', () => {
  let id, storeId
  before((done) => {
    Store.remove({}, err => {
      const newStore = new Store({_id: "test", name: 'test'})
      newStore.save((err, store) => {
        storeId = store._id
        InventoryItem.remove({}, (err) => {
          done()
        })
      })
    })
  })

  it('should not INSERT an Item without store id', (done) => {
    const newItem = { name: 'Carrot', unit: 'bag' }
    chai.request(server)
      .post('/api/inventory/items')
      .send(newItem)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('errors')
        done()
      })
  })

  it('should INSERT an Item', (done) => {
    const newItem = { name: 'Carrot', unit: 'bag', _store: storeId }
    chai.request(server)
      .post('/api/inventory/items')
      .send(newItem)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').eql('Carrot')
        done()
      })
  })

  it('should INSERT an Item', (done) => {
    const newItem = { name: 'Cabbage', unit: 'case', _store: storeId }
    chai.request(server)
      .post('/api/inventory/items')
      .send(newItem)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').eql('Cabbage')
        id = res.body._id
        done()
      })
  })

  it('it should GET all the Items', (done) => {
    chai.request(server)
      .get('/api/inventory/items/store/' + storeId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(2)
        done()
      })
  })

  it('it should GET the Item by id', (done) => {
    chai.request(server)
      .get('/api/inventory/items/' + id)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').eql('Cabbage')
        done()
      })
  })

  it('it should UPDATE an Item by id', (done) => {
    chai.request(server)
      .put('/api/inventory/items/' + id)
      .send({name: "Mushroom"})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').eql('Mushroom')
        done()
      })
  })

  it('it should REMOVE an Item by id', (done) => {
    chai.request(server)
      .delete('/api/inventory/items/' + id)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').eql('Mushroom')
        done()
      })
  })

  it('it should GET all the Items', (done) => {
    chai.request(server)
    .get('/api/inventory/items/store/' + storeId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(1)
        done()
      })
  })

})
