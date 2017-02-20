import express from 'express'
const router = express.Router({mergeParams: true})
import ShoppingList from '../models/ShoppingList'
import ShoppingListController from '../controllers/ShoppingListController'

router.get('/:id', (req, res) => {
  ShoppingListController.getByStoreId(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.post('/new', (req, res) => {
  ShoppingListController.new(req.body.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.post('/items', (req, res) => {
  ShoppingListController.insert(req.body.id, req.body.store)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.put('/items', (req, res) => {
  ShoppingListController.update(req.body.id, req.body.store)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.delete('/items', (req, res) => {
  ShoppingListController.remove(req.body.id, req.body.store)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.put('/transfer', (req, res) => {
  ShoppingListController.transfer(req.body.store)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/history/:id', (req, res) => {
  ShoppingListController.getHistoryByStoreId(req.body.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})


export default router
