define(['text!templates/left.html','text!templates/lists.html','text!templates/list_summary.html', 'ShoppingView', 'models/List'], function(mainTemplate, listsTemplate, summaryTemplate, ShoppingView, List){
  var listsView = ShoppingView.extend({
    el: $('#left'),
    tagName: 'li',
    className: 'lists_view',
    page: 1,
    perPage: 10,
    totalPages: 0,
    template: _.template(mainTemplate),
    listsTemplate: _.template(listsTemplate),
    summaryTemplate: _.template(summaryTemplate),

    events: {
      'click #new_list': 'on_submit',
      'click .pagination a': 'changePage'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'on_submit');
      //this.model.bind('reset', this.render_lists);
      //this.model.bind('change', this.render_lists);
      //this.model.bind('add', this.render_lists);
    },

    changePage: function(event){
      this.page = parseInt($(event.target).data('page'));
      this.render_lists();
    },
    
    render_lists: function(){
      var that = this;
      this.totalPages = Math.floor((this.model.length / this.perPage)) + 1;

      var start = (this.page - 1) * this.perPage;
      var end = start + this.perPage;
      var subset = _.filter(this.model.models, function(num, index){
        return (index >= start) && (index <= end);
      });

      $('#list-panel').empty();
      $('#list-panel').append(this.listsTemplate({ totalPages: this.totalPages }));
      subset.forEach(function(list){
        $('#latest_lists:first').append(that.summaryTemplate(list.toJSON()));
      });
      return this;
    },

    render: function(list){
      $(this.el).append(this.template);
      this.render_lists();
    },

    on_submit: function(event){
      event.preventDefault();
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
