const Movie = require('../models/Movie');
const { scrapeIMDb } = require('../scraper/imdbScraper');

// @desc    Scrape IMDb and save/update in DB
// @route   GET /api/movies/scrape
const scrapeAndSaveMovies = async (req, res) => {
  try {
    const moviesData = await scrapeIMDb();
    
    if (!moviesData || moviesData.length === 0) {
      return res.status(400).json({ success: false, message: 'No data scraped' });
    }

    // Clear existing movies or update them
    await Movie.deleteMany({});
    
    const savedMovies = await Movie.insertMany(moviesData);

    res.status(200).json({
      success: true,
      count: savedMovies.length,
      data: savedMovies
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all movies
// @route   GET /api/movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ rank: 1 });
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Refresh movies data
// @route   POST /api/movies/refresh
const refreshMovies = async (req, res) => {
  try {
    const moviesData = await scrapeIMDb();
    
    if (!moviesData || moviesData.length === 0) {
      return res.status(400).json({ success: false, message: 'No data scraped' });
    }

    await Movie.deleteMany({});
    const savedMovies = await Movie.insertMany(moviesData);

    res.status(200).json({
      success: true,
      message: 'Movies refreshed successfully',
      count: savedMovies.length,
      data: savedMovies
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  scrapeAndSaveMovies,
  getMovies,
  getMovie,
  refreshMovies
};
