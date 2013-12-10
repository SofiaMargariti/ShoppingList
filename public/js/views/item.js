define(['ShoppingView', 'text!templates/item.html'], function(ShoppingView, itemTemplate){
  var itemView = ShoppingView.extend({
    tagName: 'tr',

    render: function(){
      $(this.el).html(_.template(itemTemplate, this.model.toJSON()));
      return this;
    }
  });

  return itemView;
});
