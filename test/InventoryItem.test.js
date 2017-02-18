// import mongoose from "mongoose"
// mongoose.Promise = global.Promise
import InventoryItem from '../src/models/InventoryItem'

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'
let should = chai.should()
const url = 'http://localhost:8000'

chai.use(chaiHttp)

describe('InventoryItem', () => {
  let id
  before((done) => {
    InventoryItem.remove({}, (err) => {
      let newItem = new InventoryItem({ name: 'Carrot', unit: 'bag' })
      newItem.save((err, res) => {
        newItem = new InventoryItem({ name: 'Mushroom', unit: 'case' })
        newItem.save((err, res) => {
          id = res._id
          done()
        })
      });
    })
  })

  it('it should GET all the Items', (done) => {
    chai.request(url)
      .get('/api/inventory/items')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(2)
        done()
      })
  })

  it('it should GET the Item by id', (done) => {
    chai.request(url)
      .get('/api/inventory/items/' + id)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').eql('Mushroom')
        done()
      })
  })

  it('it should INSERT an Item', (done) => {
    const newItem = { name: 'Cabbage', unit: 'case' }
    chai.request(url)
      .post('/api/inventory/items')
      .send(newItem)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').eql('Cabbage')
        done()
      })
  })

  it('it should UPDATE an Item by id', (done) => {
    chai.request(url)
      .put('/api/inventory/items/' + id)
      .send({name: "Mushroom2"})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').eql('Mushroom2')
        done()
      })
  })

  it('it should REMOVE an Item by id', (done) => {
    chai.request(url)
      .delete('/api/inventory/items/' + id)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').eql('Mushroom2')
        done()
      })
  })

  it('it should GET all the Items', (done) => {
    chai.request(url)
      .get('/api/inventory/items')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(2)
        done()
      })
  })

})
