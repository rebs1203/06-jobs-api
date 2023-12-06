const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const Groceries = require('../models/Groceries')

const getAllGroceries = async (req, res) => {
    res.send('foood')
}

const getProduct = async (req, res) => {
    res.send('product')
}

const createProduct = async (req, res) => {
    req.body.createdBy = req.user.userId
    const product = await Groceries.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}

const updateProduct = async (req, res) => {
    res.send('update product')
}

const deleteProduct = async (req, res) => {
    res.send('delete product')
}

module.exports = {
    getAllGroceries,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}