module.exports = function(mongoose){
  var Schema = mongoose.Schema;

  var ItemSchema = new Schema({
    name: Schema.Types.ObjectId,
    price: Number
  });

  var Item = mongoose.model('Item', ItemSchema);

  var add = function(name, price, callback){
    var item = new Item({
      title: title, 
      description: description
    });

    item.save(function(err, doc){
      console.log(doc);
      callback(doc);
    });
  };

  return {
    add: add,
    Item: Item
  }
}
