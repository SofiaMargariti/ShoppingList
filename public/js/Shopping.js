define(['router'], function(router){
  var initialize = function(){
    window.location.hash = 'lists';
    Backbone.history.start();
  }

  return {
    initialize: initialize
  };
});
