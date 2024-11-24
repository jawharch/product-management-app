import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'



const initialState = {
  loading: false,
  error: null,
  products: [],
}
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/')
        return response.data; 
      } catch (error) {
        return error.message
      }
    }
  )
  

  export const addProduct = createAsyncThunk(
    "products/addProduct",
    async ({ url, newProduct }) => {
      try {
        const response = await axios.post(url, newProduct)
        return response.data
      } catch (error) {
        console.log(error.message)
      }
    }
  );
  
 
  export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, updatedProduct }) => {
      try {

        const response = await axios.put(`http://localhost:3000/api/products/${id}`, updatedProduct)
        return response.data
      } catch (error) {
        return error.message
      }
    }
  )
  

  export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`)
        return id
      } catch (error) {
        return error.message
      }
    }
  )
  
 
  const productSlice = createSlice({
    name: "products",
    initialState,
   
    extraReducers: (builder) => {
      builder
      
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true
          state.error = null
        })
        
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false
          state.products = action.payload
        })
        
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
  
        

        .addCase(addProduct.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.loading = false
          state.products.push(action.payload)
        })
        .addCase(addProduct.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
  
        

        .addCase(updateProduct.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.loading = false
          const index = state.products.findIndex((p) => p._id === action.payload._id)
          if (index !== -1) {
            state.products[index] = action.payload
          }
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
  
       
        .addCase(deleteProduct.pending, (state) => {
          state.loading = true
          state.error = null
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.loading = false
          state.products = state.products.filter((p) => p._id !== action.payload)
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.loading = false
          state.error = action.payload
        })
    },
  })
  export default productSlice.reducer