
const mongoose = require('mongoose');
require('dotenv').config();

const URI = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "/" + process.env.DB_COLLECTION + "?ssl=true&replicaSet=atlas-n0cwc0-shard-0&authSource=admin&retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('** Mongo connected!!! **\n');
};

connectDB();
module.exports = mongoose.connection;