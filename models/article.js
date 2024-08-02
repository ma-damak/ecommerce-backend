const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
  },
  imageart: {
    type: String,
    required: true,
  },
  marque: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  qtestock: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: true,
    unique: true,
  },
  scategorieID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Scategorie',
  },
})

module.exports = mongoose.model('Article', articleSchema)
