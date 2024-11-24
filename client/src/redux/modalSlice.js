import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    showModal: false,
    modalType: '',
    productIdToUpdate: null,
  }

 const modalSlice=createSlice(
    {
        name: 'modal',
        initialState,
        reducers: {
            openModal: (state, action) => {
                const {type,id=null}=action.payload
                state.showModal = true
                state.modalType=type
                state.productIdToUpdate=id
            },
            closeModal: (state) => {
                state.showModal = false
                state.modalType = ''
                state.productIdToUpdate=null
            },
            
        },
    }
 )
 
export const { openModal, closeModal } = modalSlice.actions
 export default modalSlice.reducer;