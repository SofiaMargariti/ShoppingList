require.config({
  paths: {
    jQuery: '/js/libs/jquery',
    Underscore: '/js/libs/underscore',
    Backbone: '/js/libs/backbone',
    BackboneRelational: '/js/libs/backbone-relational',
    models: 'models',
    text: '/js/libs/text',
    Bootstrap: '/js/libs/plugins/bootstrap/bootstrap',
    templates: '../templates',

    ShoppingView: '/js/ShoppingView'
  },

  shim: {
    'Bootstrap': ['jQuery'],
    'Backbone': ['Underscore', 'jQuery'],
    'BackboneRelational': ['Backbone'],
    'Shopping': ['BackboneRelational']
  }
});

require(['Shopping'], function(Shopping) {
  Shopping.initialize();
});
