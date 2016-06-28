var express = require('express');
var Yelp = require('yelp');
var router = express.Router();

var yelp = new Yelp({
  consumer_key: 'T8p3rlxD_eQLz6Jl7ePghw',
  consumer_secret: 'q_y5_QnNCzfe2MiSyB7baEqGkCk',
  token: 'GDHL7uPryiq5DNf1nScszTgyH6Uba7Zg',
  token_secret: 'LzHSrY-YdxEcRqWpmUVHkg5ZcfI'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  yelp.search({ term: 'food', location: 'Rochester', limit: "2" })
      .then(function (data) {
        console.log(data);
        res.send(data)
        //res.render()
      })
      .catch(function (err) {
        console.error(err);
      });
});

module.exports = router;
