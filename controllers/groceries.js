const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const Groceries = require('../models/Groceries')

const getAllGroceries = async (req, res) => {
    const products = await Groceries.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({products})
}

const getProduct = async (req, res) => {
    const {user:{userId}, params:{id:productId}} = req

    const product = await Groceries.findOne({
        _id: productId,
        createdBy: userId
    })

    if (!product) {
        throw new NotFoundError(`No product with id: ${productId}`)
    }

    res.status(StatusCodes.OK).json({product})
}



const createProduct = async (req, res) => {
    req.body.createdBy = req.user.userId
    const product = await Groceries.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}

const updateProduct = async (req, res) => {
    const {user:{userId}, params:{id:productId}, body:{name}} = req

    if (name === '') {
        throw new BadRequestError('Name field cannot be empty')
    }

    const product = await Groceries.findByIdAndUpdate({_id:productId, createdBy: userId}, req.body, {new:true, runValidators:true})

    if (!product) {
        throw new NotFoundError(`No product with id: ${productId}`)
    }

    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req, res) => {
    const {user: {userId}, params: {id: productId}} = req

    const product = await Groceries.findByIdAndRemove({_id:productId, createdBy:userId})

    if(!product) {
        throw new NotFoundError(`No product with id: ${productId}`)
    }
    res.status(StatusCodes.OK)
}

module.exports = {
    getAllGroceries,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}