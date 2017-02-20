import express from 'express'
const router = express.Router()

// router.use(function timeLog (req, res, next) {
//   // console.log('Time: ', Date.now())
//   next()
// })

import inventoryItemRouter from './inventoryItemRouter'
import shoppingListRouter from './shoppingListRouter'
import storeRouter from './storeRouter'
import menuRouter from './menuRouter'

router.use('/inventory/items', inventoryItemRouter)
router.use('/shoppingList', shoppingListRouter)
router.use('/stores', storeRouter)
router.use('/menus', menuRouter)

export default router
