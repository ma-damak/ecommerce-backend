const mongoose = require('mongoose')

const scategorieSchema = new mongoose.Schema({
  imagescategorie: {
    type: String,
    required: true,
  },
  nomscategorie: {
    type: String,
    required: true,
    unique: true,
  },
  categorieID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Categorie',
  },
})

module.exports = mongoose.model('Scategorie', scategorieSchema)
