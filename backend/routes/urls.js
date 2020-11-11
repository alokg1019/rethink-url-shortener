var express = require('express');
var router = express.Router();
var Url = require("./../models/url");
const mongoose = require('mongoose');
const connectDB = require('./../database/dbConnection');
var nanoid = require('nanoid');

/**
 *   Generates shortened URL for a given long URL
 */
router.post('/create', async function(req, res, next) {

  var data = req.body;
  var url = await Url.findOne({ 'long_url' : data.longUrl} ).exec();
  var KEY_LENGTH =  process.env.KEY_LENGTH;
  const MAX_COLLISION_COUNT = process.env.MAX_COLLISION_COUNT;
  var collision_count = 0;

  if(url == null)
  {

    while(true)
    {
        // Increase key length if collision count greater than MAX_COLLISION_COUNT
        if(collision_count > MAX_COLLISION_COUNT)
        {
          
           KEY_LENGTH++;
           console.log("Increasing key lenght to: " + KEY_LENGTH);
        }

        var id = nanoid.nanoid(KEY_LENGTH);
        var shortUrl = data.domain + "/" + id;
        var existingUrl = await Url.findOne({'short_url': shortUrl}).exec();

        if(existingUrl == null)
        {
          console.log("Using Key with length: " + KEY_LENGTH);
          var shortenedUrl = new Url();
          shortenedUrl.long_url = data.longUrl;
          shortenedUrl.short_url = shortUrl;
          await shortenedUrl.save();
          return res.send(shortenedUrl);
        }
        else
        {
          //Key Collision. If collision count less than MAX_COLLISION_COUNT, retry with same length key
          collision_count++;
          console.log("Collission detected. Increase count: " + collision_count);
        }
    }

  }
  else
  {
    //return old URL
    console.log("Already shortened", {url});
    return res.send(url);
  }
});

/*
  Returns the original URL to the user from the short URL
*/
router.get('/get', async function(req, res, next) {

  var shortUrl = req.query.url;
  var url = await Url.findOne({ 'short_url' : shortUrl } ).exec();
  var response = {};

  if(url == null)
  {
      response.status = 'error';
      response.message = 'URL does not exist on the server';
  }
  else
  {
    response.status = 'success';
    response.url = url;
  }

  return res.send(response);
});


module.exports = router;