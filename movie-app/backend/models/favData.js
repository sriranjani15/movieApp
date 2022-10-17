const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let movieSchema = new Schema({
  Title: {
    type: String
  },
  Year: {
    type: String
  },
  imdbID: {
    type: String
  },
  Type: {
    type: String
  },
  Poster: {
    type: String
  }
}, {
    collection: 'movies'
  })
  
module.exports = mongoose.model('favData', movieSchema)