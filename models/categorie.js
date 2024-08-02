const mongoose = require('mongoose')

const categorieSchema = new mongoose.Schema({
  nomcategorie: {
    type: String,
    required: true,
    unique: true,
  },
  imagecategorie: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Categorie', categorieSchema)
