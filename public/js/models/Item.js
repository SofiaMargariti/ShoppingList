define(function(require){
  var Item = Backbone.RelationalModel.extend({
    url: '/api/item/'
  });

  return Item;
});
