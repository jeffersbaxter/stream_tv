var express =  require('express');
var Video = require('../models/video');
var router= express.Router();

router.get('/', function(req, res){
	Video.find(function(err, videos){
		if (err) return res.send({message: "No video found"});
		res.send(videos);
	});
});

router.post('/', function(req, res){
	Video.create(req.body, function(err, video){
		if(err) return res.status(500).send(err);
		res.send(video);
	});	
});

router.route('/:id')
  .get(function(req, res) {
    Video.findById(req.params.id, function(err, video) {
      if (err) return res.status(500).send(err);
      res.send(video);
    });
  })
  .put(function(req, res) {
    Video.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Video.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;