import express from 'express'
const router = express.Router({mergeParams: true})
import Order from '../models/Order'
import OrderItem from '../models/OrderItem'
import OrderController from '../controllers/OrderController'

router.post('/items', (req, res) => {
  OrderController.insertItem(req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

export default router
