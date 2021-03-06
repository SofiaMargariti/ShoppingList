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
      'submit #new_list': 'new_list',
      'click .pagination a': 'change_page',
      'click #latest_lists td': 'show_list'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'new_list');
      //this.model.bind('reset', this.render_lists);
      //this.model.bind('change', this.render_lists);
      //this.model.bind('add', this.render_lists);
    },

    change_page: function(event){
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
      $(this.el).html(this.template);
      this.render_lists();
    },

    new_list: function(event){
      event.preventDefault();
      var that = this;
      var $form = $(event.target);

      var l = new List({
        title: $form.find("input[name='title']").val(),
        description: $form.find('input[name="description"]').val()  
      });

      l.save({}, { success: function(list, response){
          that.model.add(list, {at: 0});
          window.location.hash = 'list/' + list.get('_id');
        },
        error: function(err){
          console.log(err);
        }
      });
    },

    show_list: function(event){
      var row = $(event.target)[0];
      var id = $(row).data('id'); 
      $(row.parentElement).css({'background': '#456'});
      $(row.parentElement).siblings().css({'background': '#fff'});
      window.location.hash = 'list/' + encodeURIComponent(id);
    },

  });

  return listsView;
});
