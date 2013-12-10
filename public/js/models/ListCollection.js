define(['models/List'], function(List){
  var ListCollection = Backbone.Collection.extend({
    url: '/api/list',
    model: List
  });

  return ListCollection;
});
