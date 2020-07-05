const express = require('express');
const router = express.Router();
const YoutubeTrending = require('../scrapers/youtubeTrending.js');

let trendingVideos;

// Route for homepage
router.get('/', (req, res) => {
  res.render('index');
});

// Route for YouTube trending videos list
router.get('/youtube', (req, res) => {
  (async function() {
    try {
      trendingVideos = await YoutubeTrending.getYT();
    } catch (e) {
      return console.log(e);
    }
    })().then(() => {
      res.render('youtube_trending', {videos: trendingVideos});
    })
});

// Route for homepage
router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;