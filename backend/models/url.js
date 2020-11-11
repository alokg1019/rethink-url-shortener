const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let url = new mongoose.Schema({
  long_url: {
    type: String
  },
  short_url: {
    type: String
  },
  date_created : {
      type: { type: Date, default: Date.now }
  }
});

let Url = mongoose.model("Url", url);
module.exports = Url;