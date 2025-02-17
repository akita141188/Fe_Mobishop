import {createSlice} from "@reduxjs/toolkit" ;
const initialState = {
    items: [],
}
const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers:{
        addToCart: (state, action)=>{
            let isProductExists = false;
            state.items.map((item)=>{
                if(item._id===action.payload._id){
                    item.qty += action.payload.qty;
                    isProductExists = true;
                }
                return item;
            })
            if(!isProductExists){
                state.items.push(action.payload);
            }
           
        },
        updateCart: (state, action)=>{
            state.items.map((item)=>{
                if(item._id===action.payload._id){
                    item.qty = Number(action.payload.qty);
                }
                return item;
            });
        },
        deleteItemCart: (state, action)=>{
            state.items = state.items.filter((item)=>item._id !== action.payload._id);
        },
        clearCart : (state)=>{
            state.items = []
        }
    }
});
export const {addToCart, updateCart, deleteItemCart, clearCart} = cartReducer.actions;
export default cartReducer.reducer;