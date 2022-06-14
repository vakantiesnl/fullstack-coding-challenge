var express = require('express');
var _ = require('underscore');
var router = express.Router();

var util = require('../_util');

router.get('/:accommodationId', function (req, res) {

  const reviews = []; // Insert logic to load the reviews from the data service

  let { start = 1, limit, filterBy, sortBy = 'entryDate' } = req.query;
  let data = _.sortBy(reviews, sortBy).reverse(); // reverse to sort desc
  let filtered = data.filter((review) =>
    filterBy ? review.traveledWith === filterBy : true
  );
  let paginated = filtered.slice(start - 1, limit);
  res.json({ all: data, filtered: filtered, limited: paginated });
});

router.get('/average/:accommodationId', function (req, res) {
  const reviews = []; // Insert logic to load the reviews from the data service

  let { generalAvg, aspecsAvg } = util.getAverageRatings(reviews);
  let traveledWithAvg = util.getAverageTravelledWith(reviews);
  res.json({ generalAvg, aspecsAvg, traveledWithAvg });
});

module.exports = router;
