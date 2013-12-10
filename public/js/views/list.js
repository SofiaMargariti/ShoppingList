define(['ShoppingView', 'views/item', 'text!templates/list.html',  'models/Item'], 
function(ShoppingView, ItemView, listTemplate, Item)
{
  var listView = ShoppingView.extend({
    el: $('#content'),
    
    events: {
      'click #add': 'addItem',
      'click #add_item_button': 'showForm',
      'click #save': 'saveList'
    },

    initialize: function(){
      this.model.bind('change', this.render, this);
    },


    showForm: function(){
      $('#add_item_button').hide();
      $('#add_item').show();
    },

    addItem: function(event){
      var item = {
        name: $("input[name='name']").val(), 
        price: $("input[name='price']").val(), 
        description: $("input[name='description']").val(), 
        quantity: $("input[name='quantity']").val()  
      };
      this.model.get('items').push(item);
      this.render();
    },

    saveList: function(){
      this.model.save();
      console.log(this.model.get('items').toJSON());
    },

    render: function() {
      this.$el.html(
        _.template(listTemplate, this.model.toJSON())
      );
      
      $('#add_item').hide();
      
      var itemCollection = this.model.get('items');
      if ( null != itemCollection ){
        itemCollection.each(function(item) {
          var itemHtml = (new ItemView({ model: item})).render().el;
          $(itemHtml).appendTo('#items');
        });
      }
    }
  });    
  
  return listView;
});
