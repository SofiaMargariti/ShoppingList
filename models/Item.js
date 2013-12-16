module.exports = function(mongoose){
  var Schema = mongoose.Schema;

  var ItemSchema = new Schema({
    name: {type: String, unique: true},
    price: Number
  });

  var Item = mongoose.model('Item', ItemSchema);

  var add = function(name, price, callback){
    var item = new Item({
      name: name, 
      price: price
    });

    item.save(function(err, doc){
      if (err) {console.log(err);}
      callback(doc);
    });
  };

  var findByString = function(str, callback){
    var searchRegex = new RegExp(str, 'i');
    Item.find({ name: { $regex: searchRegex }}, null, function(err, items){
      callback(items);
    });
  }

  return {
    add: add,
    findByString: findByString,
    Item: Item
  }
}
