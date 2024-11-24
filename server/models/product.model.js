const { connectDB } = require('../db')
const { ObjectId } = require('mongodb')
const io = require('socket.io')


class Product {

  constructor(name, type, price, rating, warranty_years, available) {
    this.name = name
    this.type = type
    this.price = price
    this.rating = rating
    this.warranty_years = warranty_years
    this.available = available
  }
  


  static async createProduct(productData) {




    if (!productData.name || !productData.type || !productData.price || !productData.rating || !productData.warranty_years || typeof productData.available !=='boolean') {
      throw new Error("Missing required fields")
    }

    try {
      
    const db= await connectDB()
      const result = await db.collection('products').insertOne(productData)
      const createdProduct = await db.collection('products').findOne({ _id: result.insertedId });
      // io.emit('productAdded', createdProduct);
      return createdProduct
    } catch (error) {
      throw new Error("Error creating product: " + error.message)
    }
  }


  static async getAllProducts() {
    const db= await connectDB()
    try {
      const products = await db.collection('products').find().toArray()
      return products;
    } catch (error) {
      throw new Error("Error fetching products: " + error.message)
    }
  }


  static async getProductById(productId) {
    const db= await connectDB()
    try {
        console.log(productId)
        const objectId= new ObjectId(productId)
      const product = await db.collection('products').findOne({ _id:objectId  })
      
      if (!product) {
        throw new Error("Product not found.")
      }
      return product;
    } catch (error) {
      throw new Error("Error fetching product: " + error.message)
    }
  }


  static async updateProduct(productId, updatedData) {
    const db= await connectDB()
    try {
      const result = await db.collection('products').updateOne(
        { _id: new ObjectId(productId) },
        { $set: updatedData }
      );
      if (result.modifiedCount === 0) {
        throw new Error("Product not found")
      }
      const updatedProduct = await db.collection('products').findOne({ _id: new ObjectId(productId) })

      // io.emit('productUpdated', updatedProduct);
      return updatedProduct
    } catch (error) {
      throw new Error("Error updating product: " + error.message)
    }
  }


  static async deleteProduct(productId) {
    const db= await connectDB()
    try {
      const result = await db.collection('products').deleteOne({ _id: new ObjectId(productId) })
     
      if (result.deletedCount === 0) {
        throw new Error("Product not found.")
      }
      // io.emit('productDeleted', productId);
      return 'Product deleted successfully'
    } catch (error) {
      throw new Error("Error deleting product: " + error.message)
    }
  }
}

module.exports = Product