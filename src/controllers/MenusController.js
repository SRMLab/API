console.log('MENUS CONTROLLER IS ON!');
var mongoose = require('mongoose');
var Menu = mongoose.model('Menu');

function MenusController(){
  this.create = function(req,res){
    var menu = new Store({
      name: req.body.name,
      price: req.body.price,
      vegan: req.body.vegan
    });
    menu.save(function(err) {
      if(err){
        console.log("something went wrong in controllers!");
      } else {
        res.json({placeholder:'create', menu:new_menu});
      }
    })
  };
}

module.exports = new StoresController();