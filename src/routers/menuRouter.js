var express = require('express');
var router = express.Router({mergeParams: true});
import Store from '../models/Store';
import Menu from '../models/Menu';

// post new menu
router.post('/store/:storeId', function(req,res){
  Store.findById(req.params.storeId).exec(function (err, store){
    const newMenu = new Menu({_store:req.params.storeId, ...req.body});
    // console.log("newMenu:::   ",newMenu);
    newMenu.save(function(err, menu){
      if (err) res.json(err);
      // console.log("Store:::   ",store)
      // console.log("MENU::::   ",menu)
      store._menus.push(menu._id);
      store.save(function(err){
        if (err) res.json(err);
        res.json(menu);
      })
    })
  });
})

// get all menus by a store
router.get('/store/:storeId', function(req,res){
  Store.findById(req.params.storeId).populate('_menus').exec(function (err, store){
    if (err) res.json(err);
    res.json(store._menus);
  });
})

// get a menu by id
router.get('/:menuId', function(req,res){
  Menu.findById(req.params.menuId).exec(function (err, menu){
    if (err) res.json(err);
    res.json(menu);
  });
})

// update a menu
router.put('/:menuId', function(req,res){
  Menu.findByIdAndUpdate(req.params.menuId,
  {$set: {...req.body} },
  { new: true }
  ).exec(function (err, menu){
    if (err) res.json(err);
    res.json(menu);
  });
})

// delete a menu
router.delete('/:menuId', function(req,res){
  Menu.findByIdAndRemove(req.params.menuId,
  ).exec(function (err, menu){
    if (err) res.json(err);
    res.json(menu);
  });
})


module.exports = router;
