const express = require('express')
const router = express.Router()

const Scategorie = require('../models/scategorie')

router.get('/', (req, res) => {
  Scategorie.find({}, null, { sort: { _id: -1 } })
    .populate('categorieID')
    .then((scategories) => {
      res.json(scategories)
    })
})

router.get('/:id', (req, res, next) => {
  Scategorie.findById(req.params.id)
    .then((scategorie) => {
      if (scategorie) {
        res.json(scategorie)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

router.post('/', (req, res, next) => {
  const { imagescategorie, nomscategorie, categorieID } = req.body

  const scategorie = new Scategorie({
    imagescategorie,
    nomscategorie,
    categorieID,
  })

  scategorie
    .save()
    .then((savedScategorie) => {
      res.json(savedScategorie)
    })
    .catch((error) => {
      next(error)
    })
})

router.put('/:id', (req, res, next) => {
  const { imagescategorie, nomscategorie, categorieID } = req.body

  Scategorie.findByIdAndUpdate(
    req.params.id,
    {
      imagescategorie,
      nomscategorie,
      categorieID,
    },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedScategorie) => {
      if (updatedScategorie) {
        res.json(updatedScategorie)
      } else {
        res.status(404).json({ error: 'Scategorie not found' })
      }
    })
    .catch((error) => {
      next(error)
    })
})

router.delete('/:id', (req, res, next) => {
  Scategorie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
