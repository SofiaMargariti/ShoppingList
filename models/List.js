module.exports = function(mongoose){
  var Schema = mongoose.Schema;

  var ListSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    total: String,
    dateCreated: { type: Date, default: Date.now },
    dateExecuted: { type: Date, default: null },
    items: [{
              name: String,
              price: Number,
              description: String,
              quantity: Number
           }],
    executed: { type: Boolean, default: false}
  });

  var Item = require('./Item')(mongoose);
  var List = mongoose.model('List', ListSchema);

  var add = function(title, description, callback){
    var list = new List({
      title: title, 
      description: description
    });

    list.save(function(err, doc){
      console.log(doc);
      callback(doc);
    });
  };

  var addItem = function(list, item){
    var item_doc = new Item({
      name: item['name'],
      price: item['price'],
    });

    item.save(function(err){
      if(err){ 
        console.log(err); 
        return;
      }
    });
    list.items.push(item);
    this.calculateTotal(list);
  };

  var findById = function(listId, callback) {
    List.findOne({_id: listId}, function(err,doc) {
      callback(doc);
    });
  };

  var findAll = function(callback){
    List.find({}, null, function(err, docs){
      callback(docs);
    });
  };
  var calculateTotal = function(list){
    var items = list.items;
    var total = 0;
    for (var i=0; i< items.length; i++){
      total += items[i].price * items[i].quantity;
    }
    list.total = total;
    list.save(list);
  };

  return {
    findById: findById,
    findAll: findAll,
    add: add,
    addItem: addItem,
    calculateTotal: calculateTotal,
    List: List
  }
}

