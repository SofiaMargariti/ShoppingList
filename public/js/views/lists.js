define(['text!templates/lists.html','text!templates/list_summary.html', 'ShoppingView', 'models/List'], function(listsTemplate, SummaryTemplate, ShoppingView, List){
  var listsView = ShoppingView.extend({
    el: $('#content'),
    tagName: 'li',
    className: 'lists_view',
    template: _.template(listsTemplate),

    events: {
      'click input[type=submit]': 'on_submit'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'on_submit');
      this.model.bind('reset', this.render);
      this.model.bind('change', this.render);
      this.model.bind('add', this.render_list_summary);
    },

    render: function(){
      $(this.el).html(this.template);
      this.model.forEach(this.render_list_summary);
      return this;
    },

    render_list_summary: function(list){
      console.log(list.toJSON())
      var summary_template = _.template(SummaryTemplate)
      $('#latest_lists').prepend(summary_template(list.toJSON()));
    },

    on_submit: function(){
      var that = this;

      var l = new List({
        title: this.$('input[name="title"]').val(),
        description: this.$('input[name="description"]').val()  
      });
      l.save({}, { success: function(list, response){
          that.model.add(list, {at: 0});
          window.location.hash = 'list/' + list.get('_id');
        },
        error: function(err){
          console.log(err);
        }
      });
    }

  });

  return listsView;
});


