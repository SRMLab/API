console.log('STORES CONTROLLER IS ON!');
var mongoose = require('mongoose');
var Store = mongoose.model('Store');

function StoresController(){
  this.create = function(req,res){
    var store = new Store({
      name: req.body.name,
      email: req.body.email
    });
    store.save(function(err) {
      if(err){
        console.log("something went wrong in controllers!");
      } else {
        res.json({placeholder:'create', store:new_store});
      }
    })
  };

  this.show = function(req,res){
    Store.findOne({_id:req.params.storeId})
    .populate({
      path: '_menus'
    })
    .exec(function(err, store){
      res.json({placeholder:'show_store', store:store})
    })
}


module.exports = new StoresController();