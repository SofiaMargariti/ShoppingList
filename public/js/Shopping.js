define(['router'], function(router){
  var initialize = function(){
    Backbone.history.start();
   // window.location.hash = 'lists';
  }

  return {
    initialize: initialize
  };
});
