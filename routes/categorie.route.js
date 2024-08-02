const express = require('express')
const router = express.Router()

const Categorie = require('../models/categorie')

router.get('/', (req, res) => {
  Categorie.find({}, null, {
    sort: { _id: -1 },
  }).then((categories) => {
    res.json(categories)
  })
})

router.get('/:id', (req, res, next) => {
  Categorie.findById(req.params.id)
    .then((categorie) => {
      if (categorie) {
        res.json(categorie)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

router.post('/', (req, res, next) => {
  const { nomcategorie, imagecategorie } = req.body

  const categorie = new Categorie({
    nomcategorie,
    imagecategorie,
  })

  categorie
    .save()
    .then((savedCategorie) => {
      res.json(savedCategorie)
    })
    .catch((error) => {
      next(error)
    })
})

// check out $set
router.put('/:id', (req, res, next) => {
  const { nomcategorie, imagecategorie } = req.body

  Categorie.findByIdAndUpdate(
    req.params.id,
    { nomcategorie, imagecategorie },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedCategorie) => {
      if (updatedCategorie) {
        res.json(updatedCategorie)
      } else {
        res.status(404).json({ error: 'Categorie not found' })
      }
    })
    .catch((error) => {
      next(error)
    })
})

router.delete('/:id', (req, res, next) => {
  Categorie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
