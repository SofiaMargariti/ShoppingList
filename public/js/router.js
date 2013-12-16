define(['views/index', 'views/list', 'views/items', 'views/lists', 'views/summary', 'models/List', 'models/ItemCollection', 'models/ListCollection'], function(IndexView, ListView, ItemsView, ListsView, SummaryView, List, ItemCollection, ListCollection){
  var ShoppingRouter = Backbone.Router.extend({
    current_view: null,
    lists_view: null,
    details_view: null,
    list: null,
    lists: null,

    routes: {
      '': 'showLists',
      'list/:id': 'listDetails',
      'lists': 'showLists',
      'summary': 'summary' 
    },

    listDetails: function(id){
      this.showLists();
      this.list = new List({id: id});
      this.details_view = new ListView({ model: this.list });
      var that = this;
      this.list.fetch({success: function(){
        that.details_view.render();
      }});
    },
    
    showLists: function(){
      this.lists = this.lists || new ListCollection();
      if (!this.lists_view) {
        this.lists_view = new ListsView({ model: this.lists });
        this.lists_view.render();
        this.lists.fetch();
      }
    },

  });

  return new ShoppingRouter();
});

