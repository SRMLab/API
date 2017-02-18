import express from 'express'
const router = express.Router({mergeParams: true})
import InventoryItem from '../models/InventoryItem'
import InventoryItemController from '../controllers/InventoryItemController'


router.get('', (req, res) => {
  InventoryItemController.getAll()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/:id', (req, res) => {
  InventoryItemController.getById(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.post('', (req, res) => {
  InventoryItemController.insert(req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.put('/:id', (req, res) => {
  InventoryItemController.update(req.params.id, req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
  InventoryItemController.remove(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

export default router
