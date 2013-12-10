define(['models/Item', 'models/ItemCollection'], function(Item, ItemCollection){
  var List = Backbone.RelationalModel.extend({
    urlRoot: '/api/list/',
    
    relations: [{
      type: Backbone.HasMany,
      key: 'items',
      relatedModel: Item,
      collectionType:  ItemCollection,
      reverseRelation: {
        key: 'list',
        includeInJSON: '_id'
      }
    }]

  });

  return List;
});
