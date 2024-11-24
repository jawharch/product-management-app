const Product = require('../models/product.model.js')
const { ObjectId } = require('mongodb')

exports.createProduct = async (req, res) => {
  try {
    
  
    const result = await Product.createProduct(req.body)
    console.log(result)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.getProductById = async (req, res) => {
  try {
    const {id}=req.params
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' })
      }
    
    const product = await Product.getProductById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const result = await Product.updateProduct(req.params.id,req.body)  
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const result = await Product.deleteProduct(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};
