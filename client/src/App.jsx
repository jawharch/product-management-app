import { useEffect, useState } from 'react'

import './App.css'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Select,
  Snackbar,
  Alert,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, fetchProducts, updateProduct,deleteProduct } from './redux/productSlice'
import { closeModal, openModal } from './redux/modalSlice'
import axios from 'axios'
import { closedeleteModal, opendeleteModal } from './redux/deletemodalSlice'


// const socket = io('http://localhost:5000');
function App() {

 

  const dispatch=useDispatch()
  const {showModal,modalType,productIdToUpdate}=useSelector(state=>state.modal)
  const {products,loading}=useSelector(state=>state.product)
  const {showdeleteModal,taskIdToDelete}=useSelector(state=>state.deletemodal)

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState("info")

    
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    rating: "",
    warranty_years: "",
    available: "",
  })

  const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    

  }
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };


  


const handleModalClose = () => {
    dispatch(closeModal())
  }

  const handleModalDeleteClose = () => {
    dispatch(closedeleteModal())
  }


  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false)
  }



  useEffect(() => {

    dispatch(fetchProducts())


    // La partie du socket.io mais en commentaires

    // socket.on('productAdded', (newProduct) => {
    //   dispatch({ type: 'products/addProduct', payload: newProduct })
    // })

    // socket.on('productUpdated', (updatedProduct) => {
    //   dispatch({ type: 'products/updateProduct', payload: updatedProduct })
    // })

    // socket.on('productDeleted', (productId) => {
    //   console.log(`Product ${productId} was deleted`);
    //   // Do something in the UI, like removing the product
    // });
    // return () => {
    //   socket.off('productAdded')
    //   socket.off('productUpdated')
    //   socket.off('productDeleted')
    // }
    
}, [dispatch])


   
   const handleChange=(e)=>
   {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

   }



  const addProductClick=async (e)=>
  {
   
    e.preventDefault();
    try {
       await dispatch(
        addProduct({ 
          url: 'http://localhost:3000/api/products/', 
          newProduct: formData 
        })
      ).unwrap()

  setFormData({
        name: "",
        type: "",
        price: "",
        rating: "",
        warranty_years: "",
        available: "",
      });
  
      dispatch(closeModal())
      setSnackbarMessage('Product Created Successfully')
      setSnackbarSeverity('success')
      setIsSnackbarOpen(true);
     

 
    } catch (error) {
      console.error("Error adding product:", error)
    }

  }



  const handleEditProductClick=async(product)=>
  {
    try {
      dispatch(openModal({type:'update',id:product._id}))
      const res= await axios.get(`http://localhost:3000/api/products/${product._id}`)
      const {_id,...rest}=res.data
      setFormData({ ...rest })
      
     

      
    } catch (error) {
      console.log(error.message)
      
    }
   


  }

  
  const editProductClick=async(e)=>
  {
    e.preventDefault()
    try {
      dispatch(updateProduct({
        id:productIdToUpdate,
        updatedProduct:formData
      }))
  
 
      dispatch(closeModal())
      setFormData({
        name: "",
        type: "",
        price: "",
        rating: "",
        warranty_years: "",
        available: "",
      });
      setSnackbarSeverity('success')
      dispatch(closeModal())
      setSnackbarMessage('Product modified Successfully')

      setIsSnackbarOpen(true)
  
      
    } catch (error) {
      console.log(error.message)
      
    }
    
   
  }



  const deleteProductClick=()=>
  {
    try {
      dispatch(deleteProduct(taskIdToDelete))

      dispatch(closedeleteModal())
      setSnackbarSeverity('error')
      dispatch(closeModal())
      setSnackbarMessage('Product Deleted Successfully')

      setIsSnackbarOpen(true);



    } catch (error) {
      console.log(error.message)
      
    }
  }

  // const products=[
  //   { "_id" : 1, "name" : "AC1 Phone1", "type" : "phone", "price" : 200.05, "rating" : 3.8,"warranty_years" : 1, "available" : true },
  //   { "_id" : 2, "name" : "AC2 Phone2", "type" : "phone", "price" : 147.21, "rating" : 1,"warranty_years" : 3, "available" : false },
  //   { "_id" : 3, "name" : "AC3 Phone3", "type" : "phone", "price" : 150, "rating" : 2,"warranty_years" : 1, "available" : true },
  //   { "_id" : 4, "name" : "AC4 Phone4", "type" : "phone", "price" : 50.20, "rating" : 3,"warranty_years" : 2, "available" : true },
  //   { "_id" : 1, "name" : "AC1 Phone1", "type" : "phone", "price" : 200.05, "rating" : 3.8,"warranty_years" : 1, "available" : true },
  //   { "_id" : 2, "name" : "AC2 Phone2", "type" : "phone", "price" : 147.21, "rating" : 1,"warranty_years" : 3, "available" : false },
  //   { "_id" : 3, "name" : "AC3 Phone3", "type" : "phone", "price" : 150, "rating" : 2,"warranty_years" : 1, "available" : true },
  //   { "_id" : 4, "name" : "AC4 Phone4", "type" : "phone", "price" : 50.20, "rating" : 3,"warranty_years" : 2, "available" : true },
  //   { "_id" : 2, "name" : "AC2 Phone2", "type" : "phone", "price" : 147.21, "rating" : 1,"warranty_years" : 3, "available" : false },
  //   { "_id" : 3, "name" : "AC3 Phone3", "type" : "phone", "price" : 150, "rating" : 2,"warranty_years" : 1, "available" : true },
  //   { "_id" : 4, "name" : "AC4 Phone4", "type" : "phone", "price" : 50.20, "rating" : 3,"warranty_years" : 2, "available" : true }
  // ]
 
  return (
    <>
       <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
        Product List
      </Typography>

    
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {dispatch(openModal({type:'create'}))
          setFormData({
      name: "",
      type: "",
      price: "",
      rating: "",
      warranty_years: "",
      available: "",
    });
          }}
          
        >
          Add Product
        </Button>
      </Box>


      <Grid container spacing={7}>

      {loading &&  <div>Loading ...</div>}
      {
        
      products && products.length > 0 ? (
          [...products].reverse()?.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id}>
          <Card
  sx={{
    maxWidth: 345,
    borderRadius: 3,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    },
  }}
>
 
  <Box
    sx={{
      height: 180,
      backgroundImage: `url('https://www.lemoniteur.fr/mediatheque/3/0/6/002428603_896x598_c.jpg')`, 
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
    }}
  />

  <CardContent sx={{ padding: 2 }}>
    <Typography variant="h6" component="div" gutterBottom textAlign='center'>
      {product?.name || "Unnamed Product"}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
      <strong>Type:</strong> {product?.type || "N/A"}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      <strong>Price:</strong> $ {product?.price || "N/A"}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      <strong>Rating:</strong> {product?.rating ? `${product.rating} / 5` : "No Rating"}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      <strong>Warranty:</strong> {product?.warranty_years > 1 ? `${product?.warranty_years} years` :`${product?.warranty_years} year`}
    </Typography>
    <Typography
      variant="subtitle1"
      textAlign='center'
      color={product?.available ? "green" : "red"}
      sx={{ fontWeight: "bold", marginTop: 1 }}
    >
      {product?.available ? "Available" : "Unavailable"}
    </Typography>
  </CardContent>



  <CardActions sx={{ justifyContent: "space-between", paddingX: 2, paddingBottom: 2 }}>
    <Button
      variant="contained"
      size="small"
      color="success"
      startIcon={<EditIcon />}
      onClick={()=>handleEditProductClick(product)}
      
    >
      Edit
    </Button>
    <Button
      variant="contained"
      color="error"
      size="small"
      startIcon={<DeleteIcon />}
      onClick={()=>dispatch(opendeleteModal(product._id))}
     
    >
      Delete
    </Button>
  </CardActions>
</Card>
          </Grid>
        ))

        ): (<h3 style={{marginLeft:'50px'}}>  No Product found </h3>)
      }
        
      </Grid>
    </Box>
    
    <Modal open={showModal} onClose={handleModalClose} aria-labelledby="update-product-modal"  >
      <Box sx={style}>
        <Typography id="update-product-modal" variant="h6" component="h2" gutterBottom>
          {
            modalType === 'create' ? 'Add Product' : 'Update Product'
          }
        </Typography>
        <form onSubmit={modalType==="create" ? addProductClick : editProductClick}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
        
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ min: 0, max: 5,step:0.1 }}
            value={formData.rating}
            onChange={handleChange}
            
           
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Warranty Years"
            name="warranty_years"
            type="number"
            value={formData.warranty_years}
            onChange={handleChange}
         
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="availability-select-label">Availability</InputLabel>
            <Select
              labelId="availability-select-label"
              name="available"
              value={formData.available}
              onChange={handleChange}
             
            >
              <MenuItem value={true}>Available</MenuItem>
              <MenuItem value={false}>Unavailable</MenuItem>
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Button variant="outlined" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit" >
            {
            modalType === 'create' ? 'create' : 'update'
          }
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>


    <Modal open={showdeleteModal} onClose={handleModalDeleteClose} aria-labelledby="delete-modal-title">
      <Box sx={modalStyle}>
        <Typography id="delete-modal-title" variant="h6" component="h2" gutterBottom>
          Are you sure you want to delete this product ?
        </Typography>
        
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button variant="outlined" color="primary" onClick={handleModalDeleteClose} >
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={deleteProductClick}  >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>

  
    <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert  variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
