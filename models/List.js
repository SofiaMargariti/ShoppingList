module.exports = function(mongoose){
  var Schema = mongoose.Schema;

  var ListSchema = new Schema({
    title: String,
    description: String,
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

  var List = mongoose.model('List', ListSchema);
  var Item = require('./Item.js')(mongoose);

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
      description: item['description'] 
    });

    item.save(function(err){
      if(err){ 
        console.log(err); 
        return;
      }
    });
    console.log(item);
    list.items.push(item);
  };

  var calculateTotal = function(list){
    var group = {
      reduce: function(curr, result){
        result.total += curr.price * curr.quantity;
      },
      initial: { total: 0 }
    };

    list.items.group(group.reduce, group.initial, function(err, result){
      console.log(result.total);
    });
  };

  return {
    add: add,
    addItem: addItem,
    calculateTotal: calculateTotal,
    List: List
  }
}

