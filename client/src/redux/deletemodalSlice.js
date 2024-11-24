import { createSlice } from "@reduxjs/toolkit"



const initialState = {
  showdeleteModal: false,
  taskIdToDelete: null,
  }

 const deletemodalSlice=createSlice(
    {
        name: 'deletemodal',
        initialState,
        reducers: {
            opendeleteModal: (state, action) => {
                state.showdeleteModal = true
                state.taskIdToDelete = action.payload
            },
            closedeleteModal: (state) => {
                state.showdeleteModal = false
                state.taskIdToDelete = null
            },
            
        },
    }
 )
 
export const { opendeleteModal, closedeleteModal } = deletemodalSlice.actions
 export default deletemodalSlice.reducer;