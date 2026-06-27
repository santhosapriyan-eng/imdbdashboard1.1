const express = require('express');
const {
  scrapeAndSaveMovies,
  getMovies,
  getMovie,
  refreshMovies
} = require('../controllers/movieController');

const router = express.Router();

router.get('/scrape', scrapeAndSaveMovies);
router.post('/refresh', refreshMovies);
router.route('/').get(getMovies);
router.route('/:id').get(getMovie);

module.exports = router;
