import setup from '../data/setup'

import Store from '../src/models/Store'
import InventoryItem from '../src/models/InventoryItem'
import ShoppingList from '../src/models/ShoppingList'
import ShoppingHistory from '../src/models/ShoppingHistory'

import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'
const should = chai.should()

chai.use(chaiHttp)
const baseUrl = '/api/shoppingList'

describe('ShoppingList', () => {
  const storeId = 'aaa'
  before((done) => {
    ShoppingList.remove({}, () => {
      ShoppingHistory.remove({}, () => {
        setup(done)
      })
    })
  })

  it('should not make new shopping list without store id', (done) => {
    const newShoppingList = {}
    chai.request(server)
      .post(`${baseUrl}/new`)
      .send(newShoppingList)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('errors')
        done()
      })
  })

  it('should make a shopping list with store id', (done) => {
    const newShoppingList = { id: storeId }
    chai.request(server)
      .post(`${baseUrl}/new`)
      .send(newShoppingList)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('items').eql([])
        res.body.should.have.property('_id').eql('aaa')
        done()
      })
  })

  it('should make a shopping list with same store id', (done) => {
    const newShoppingList = { id: storeId }
    chai.request(server)
      .post(`${baseUrl}/new`)
      .send(newShoppingList)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('items').eql([])
        res.body.should.have.property('_id').eql('aaa')
        done()
      })
  })

  let id;

  it('should insert an item with its id', (done) => {
    const filter = { _store: 'aaa' }
    InventoryItem.findOneRandom(filter, (err, item) => {
      if (err) throw err
      id = item._id
      chai.request(server)
      .post(`${baseUrl}/items`)
      .send({id: item._id, store: item._store})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('items')
        res.body.items.should.be.a('array')
        const isInList = res.body.items.some(item => item._item == id)
        isInList.should.be.eql(true)
        done()
      })
    })
  })

  it('should insert an item with its id', (done) => {
    const filter = { _store: 'aaa' }
    InventoryItem.findOneRandom(filter, (err, item) => {
      if (err) throw err
      chai.request(server)
      .post(`${baseUrl}/items`)
      .send({id: item._id, store: item._store})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('items')
        res.body.items.should.be.a('array')
        const isInList = res.body.items.some(item => item._item == id)
        isInList.should.be.eql(true)
        done()
      })
    })
  })

  it('should keep an item with its same id', (done) => {
    chai.request(server)
    .post(`${baseUrl}/items`)
    .send({id: id, store: storeId})
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('items')
      res.body.items.should.be.a('array')
      const items = res.body.items.filter(item => item._item == id)
      items.length.should.be.eql(1)
      done()
    })
  })

  it('should update the item checked with its id', (done) => {
    chai.request(server)
      .put(`${baseUrl}/items`)
      .send({id: id, store: storeId})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('items')
        const item = res.body.items.find(item => item._item == id)
        item.should.have.property('checked').eql(true)
        done()
      })
  })

  it('should update the item unchecked with its id', (done) => {
    chai.request(server)
      .put(`${baseUrl}/items`)
      .send({id: id, store: storeId})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('items')
        const item = res.body.items.find(item => item._item == id)
        item.should.have.property('checked').eql(false)
        done()
      })
  })

  it('should remove the item with its id', (done) => {
    chai.request(server)
      .delete(`${baseUrl}/items`)
      .send({id: id, store: storeId})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('items')
        const isInList = res.body.items.some(item => item._item == id)
        isInList.should.be.eql(false)
        done()
      })
  })

  it('should get the shopping list by store id', (done) => {
    chai.request(server)
      .get(`${baseUrl}/${storeId}`)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('items')
        done()
      })
  })

  it('should insert an item with its id', (done) => {
    const filter = { _store: 'aaa' }
    InventoryItem.findOneRandom(filter, (err, item) => {
      if (err) throw err
      id = item._id
      chai.request(server)
      .post(`${baseUrl}/items`)
      .send({id: item._id, store: item._store})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('items')
        res.body.items.should.be.a('array')
        const isInList = res.body.items.some(item => item._item == id)
        isInList.should.be.eql(true)
        done()
      })
    })
  })

  it('should update the item checked with its id', (done) => {
    chai.request(server)
      .put(`${baseUrl}/items`)
      .send({id: id, store: storeId})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('items')
        const item = res.body.items.find(item => item._item == id)
        item.should.have.property('checked').eql(true)
        done()
      })
  })

  it('should transfer the checked items in the list to history', (done) => {
    chai.request(server)
      .put(`${baseUrl}/transfer`)
      .send({store: storeId})
      .end((err, res) => {
        // console.log(res.body);
        res.should.have.status(200)
        res.body.should.have.property('items')
        const isChecked = res.body.items.some(item => item.checked)
        isChecked.should.be.eql(false)
        done()
      })
  })

  it('should get the items in the history', (done) => {
    chai.request(server)
      .get(`${baseUrl}/history/${storeId}`)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        done()
      })
  })

})
