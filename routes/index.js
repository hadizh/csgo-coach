var express = require('express');
var router = express.Router();

var body = {};
var round_number = -1;
var total_info = [];
var total_timestamp = [];
var current_info = [];
var current_timestamp = [];

/* GET home page which is current round. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', health:current_info, time:current_timestamp});
});

router.post('/', function(req, res, next) {
  body = JSON.parse(JSON.stringify(req.body));
  if (round_number == -1) {
  	var first_timestamp = body.provider.timestamp;
  }
  //Get the number of rounds so far, if more rounds than before, push the current info in
  if (round_number < Object.keys(body.map.round_wins).length && round_number != -1) {
    total_info.push(current_info);
    total_timestamp.push(current_timestamp);
    current_info = [];
    current_timestamp = [];
  }
  round_number = Object.keys(body.map.round_wins).length;
  //Push the current post
  current_info.push(body.player.state.health);
  current_timestamp.push(body.provider.timestamp - first_timestamp);
  //Send an OK responnse back
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('')
})

module.exports = router;
