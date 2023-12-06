const express = require('express')
const router = express.Router()

const { getAllGroceries,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct } = require('../controllers/groceries')

router.route('/').post(createProduct).get(getAllGroceries)
router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct)

module.exports = router