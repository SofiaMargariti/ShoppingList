var express = require('express');
var app = express();
var mongoose = require('mongoose');
var dbPath = 'mongodb://localhost/shopping';

var List = require('./models/List')(mongoose);
var Item = require('./models/Item')(mongoose);

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
  List.findById(listId, function(err, list){
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
  console.log(req.body);
  List.findById(req.params.id, function(err, list){
    list.title = req.param('title');
    list.date_executed = req.param('date_executed');
    list.executed = req.param('executed');
    list.items = req.param('items');
    list.save(function(err, l){
      if (err){
        res.send(400);
      } else {
        res.send(l);
      }
    });
  });
});

app.get('/api/list', function(req, res){
  var lists = List.find().sort({dateCreated: 1}).exec(function(err, lists){
    res.send(lists);
  });
});

app.get('/api/item/:name', function(req,res){
  itemId = req.param.name;
  Item.findById(itemId, function(err, item){
    res.send(item);
  });
});

app.put('/api/item/:name', function(req, res){
  name = req.param.name;
  price = req.param('price', null);
  descr = req.param('descr', '');

  if (name == null || name.length < 1){
    res.send(400);
  }
  
  Item.updateitem(name, price, descr, function(item){
      res.send(item);
  });
});

app.delete('/api/item/:name', function(req, res){
  Item.findById(req.param.name).remove();
  req.send(200);
});

app.delete('/api/list/:id', function(req, res){
  List.findById(req.param.id).remove();
  req.send(200);
});


app.listen(8080);
console.log("Shopping is listening to port 8080.");
