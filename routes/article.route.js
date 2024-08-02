const express = require('express')
const router = express.Router()

const Article = require('../models/article')

router.get('/', (req, res) => {
  Article.find({}, null, { sort: { _id: -1 } })
    .populate('scategorieID')
    .then((articles) => {
      res.json(articles)
    })
})

router.get('/pagination', async (req, res, next) => {
  try {
    const search = req.query.search || ''
    const page = req.query.page || 1
    const size = req.query.size || 10

    const query = {
      designation: { $regex: search, $options: 'i' },
    }

    const totalArticles = await Article.countDocuments(query)
    const articles = await Article.find(query)
      .sort({ _id: -1 })
      .skip((page - 1) * size)
      .limit(size)
      .populate('scategorieID')

    const totalPages = Math.ceil(totalArticles / size)

    res.json({ articles, totalPages, totalArticles })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id)
    .then((article) => {
      if (article) {
        res.json(article)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

router.post('/', (req, res, next) => {
  const {
    designation,
    imageart,
    marque,
    prix,
    qtestock,
    reference,
    scategorieID,
  } = req.body

  const article = new Article({
    designation,
    imageart,
    marque,
    prix,
    qtestock,
    reference,
    scategorieID,
  })

  article
    .save()
    .then((savedArticle) => {
      res.json(savedArticle)
    })
    .catch((error) => {
      next(error)
    })
})

router.put('/:id', (req, res, next) => {
  const {
    designation,
    imageart,
    marque,
    prix,
    qtestock,
    reference,
    scategorieID,
  } = req.body

  Article.findByIdAndUpdate(
    req.params.id,
    {
      designation,
      imageart,
      marque,
      prix,
      qtestock,
      reference,
      scategorieID,
    },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedArticle) => {
      res.json(updatedArticle)
    })
    .catch((error) => {
      next(error)
    })
})

router.delete('/:id', (req, res, next) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = router
