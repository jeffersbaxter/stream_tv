var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var env = require('dotenv').load();
var request = require('request');
var app = express();

var secret = "password";

var mongoose = require('mongoose');
var User = require('./models/user');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/videos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', expressJWT({secret: secret})
.unless({path: ['/api/users'], method: 'post'}));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({message: 'You need an authorization token to view this information.'})
  }
});

app.use('/api/users', require('./controllers/users'));

app.get("/results", function(req,res){
  var query = {
    term: req.query.q
  };
  request("https://www.googleapis.com/youtube/v3/search/?part=id,snippet&q="+query.term+"&key="+process.env.YOUTUBE_KEY, function(error,response,body){
    if(error) {
      console.log(error);
    }
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(response.body);
      // console.log(data);
      res.send(data);
    }
  })
});


app.post('/api/auth', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err || !user) return res.send({message: 'User not found'});
    user.authenticated(req.body.password, function(err, result) {
      if (err || !result) return res.send({message: 'User not authenticated'});

      var token = jwt.sign(user, secret);
      res.send({user: user, token: token});
    });
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT || 3000);