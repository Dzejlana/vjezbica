var express = require('express');
var app = express();
var mongojs=require('mongojs'); //requires mongojs module
var db=mongojs('test', ['test']);//which mongodb database and collection we will using
var bodyParser= require('body-parser');


var port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

// uzima iz baze i ispisuje
app.get('/test',function(req,res){
  console.log("I received GET request");
  db.test.find(function(err,docs){
    console.log(docs);
    res.json(docs);
   });
});

// adda u bazicu 
app.post('/test',function(req,res){
  console.log(req.body);
  db.test.insert(req.body, function(err, doc){
    res.json(doc);
  });
  
});


// deleta iz bazice
app.delete('/test/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.test.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

// uzima iz bazice za update /geta za update odredjene id uzima koje ja izaberem na edit
app.get('/test/:id',function(req,res){
  var id=req.params.id;
  console.log(id);
  db.test.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
  });
});

//stavlja novi kontakt koji ja mogu update/modify
app.put('/test/:id',function(req,res){
  var id=req.params.id;
  console.log(req.body.name);
  db.test.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update:{$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new:true},function(err,doc){
    res.json(doc);
    
});
});

app.listen(port, function () {
  console.log('Example app listening on port '+ port);

}); 