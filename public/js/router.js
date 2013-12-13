define(['views/index', 'views/list', 'views/items', 'views/lists', 'views/summary', 'models/List', 'models/ItemCollection', 'models/ListCollection'], function(IndexView, ListView, ItemsView, ListsView, SummaryView, List, ItemCollection, ListCollection){
  var ShoppingRouter = Backbone.Router.extend({
    current_view: null,

    routes: {
      '': 'showLists',
      'index': 'index',
      'newList': 'newList',
      'items': 'items',
      'list/:id': 'listDetails',
      'lists': 'showLists',
      'summary': 'summary' 
    },

    changeView: function(view){
      if ( null != this.current_view ){
        this.current_view.undelegateEvents();
      }
      this.current_view = view;
      this.current_view.render();
    },

    index: function(){
      this.changeView(new IndexView());
    },

    newList: function(){
      var new_list = new List();
      this.changeView(new ListView({ model: new_list }));
    },

    items: function(){
      this.changeView(new ItemsView());
    },

    listDetails: function(id){
      var list = new List({id: id});
      var list_view = new ListView({ model: list });
      list.fetch();
    },
    
    showLists: function(){
      var lists = new ListCollection();
      this.changeView(new ListsView({ model: lists }));
      lists.fetch();
    },

    summary: function(){
      this.changeView(new SummaryView());
    }
  });

  return new ShoppingRouter();
});

