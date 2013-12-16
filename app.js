var express = require('express');
var app = express();
var mongoose = require('mongoose');
var dbPath = 'mongodb://localhost/shopping';

var Item = require('./models/Item')(mongoose);
var List = require('./models/List')(mongoose, Item);

app.configure(function(){
  app.use(express.bodyParser());
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));
  mongoose.connect(dbPath, function onMongooseError(err){
    if (err) throw err;
  });
});

app.get('/', function(req, res){
  res.render('lists.jade');
});

app.get('/dashboard', function(req, res){
  res.render('dashboard.jade');
});

app.get('/api/list/:id', function(req, res){
  var listId = req.params.id;
  List.findById(listId, function(list){
    res.send(list);
  });  
});

app.post('/api/list', function(req, res){
  var title = req.param('title', '');
  var description = req.param('description','');
  List.add(title, description, function(list){
    res.send(list);
  });
});

app.put('/api/list/:id', function(req, res){
  List.findById(req.params.id, function(list){
    list.title = req.param('title');
    list.date_executed = req.param('date_executed');
    list.executed = req.param('executed');
    list.items = req.param('items');
    List.calculateTotal(list, function(l){
      l.save(function(err, l){
        if (err){
          res.send(400);
        } else {
          res.send(l);
        }
      });
    });
  });
});

app.get('/api/list', function(req, res){
  var lists = List.findAll(function(lists){
    res.send(lists);
  });
});

app.get('/api/item/search/:str', function(req, res){
  str = req.params.str;
  Item.findByString(str, function(items){
    res.send(items);
  });
});

app.delete('/api/list/:id', function(req, res){
  List.findById(req.param.id).remove();
  req.send(200);
});

app.listen(8080);
console.log("Shopping is listening to port 8080.");
