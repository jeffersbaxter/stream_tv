var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	content: String,
	user: String
});

var VideoSchema = new mongoose.Schema({
  vidID: String,
  comment: [CommentSchema]
});


module.exports = mongoose.model('Video', VideoSchema);