const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const bookCtrl = require('../controllers/book')

router.get('/', bookCtrl.getAllBooks)
router.get('/bestrating', bookCtrl.getBestBooks)
router.get('/:id', bookCtrl.getOneBook)
router.post('/', auth, multer, bookCtrl.createBook)
router.delete('/:id', auth, bookCtrl.deleteBook)
router.put('/:id', auth, multer, bookCtrl.modifyBook)
router.post('/:id/rating', auth, bookCtrl.addRatingBook)

module.exports = router
