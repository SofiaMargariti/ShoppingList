define(['ShoppingView', 'views/item', 'text!templates/list.html',  'models/Item'], 
function(ShoppingView, ItemView, listTemplate, Item)
{
  var listView = ShoppingView.extend({
    el: $('#right'),
    
    events: {
      'submit #add_item': 'addItem',
      'keyup input[name="name"]': 'autocomplete'
    },

    initialize: function(){
      this.model.bind('change', this.render, this);
    },


    addItem: function(event){
      event.preventDefault();
      var $form = $(event.target);
      var item = {
        name: $form.find("input[name='name']").val(), 
        price: $form.find("input[name='price']").val(), 
        quantity: $form.find("input[name='quantity']").val()  
      };
      this.model.get('items').push(item);
      this.model.save();
      this.render();
    },

    autocomplete: function(event){
      var $input = $(event.target);  
      var $form = $('#add_item');
      str = $input.val();
      $.ajax({
        url: '/api/item/search/' + str,
        method: 'get',
        success: function(items){
          item = items[0];
          $input.val(item['name']);
          $form.find('input[name="price"]').val(item['price']);
        } 
      });
    },

    render: function() {
      var template = _.template(listTemplate);
      $(this.el).html(template(this.model.toJSON()));
      
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
