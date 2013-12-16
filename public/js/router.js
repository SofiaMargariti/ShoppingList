define(['views/list', 'views/lists', 'models/List', 'models/ListCollection'], function(ListView, ListsView, List, ListCollection){
  var ShoppingRouter = Backbone.Router.extend({
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
      this.list.fetch();
    },
    
    showLists: function(){
      var that = this;
      this.lists = this.lists || new ListCollection();
      if (!this.lists_view) {
        this.lists_view = new ListsView({ model: this.lists });
        this.lists.fetch({success: function(){
          that.lists_view.render();
        }});
      }
    },

  });

  return new ShoppingRouter();
});

