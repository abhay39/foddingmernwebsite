const { createSlice } = require("@reduxjs/toolkit");

const Wishlist=createSlice({
    name: "Wishlist",
    initialState: [],
    reducers: {
        addToWishlist:(state,action)=>{
            state.push(action.payload)
            
        },

        removeFromWishlist:(state,action)=>{
            console.log(state.length)
            return state=state.filter(item=>item.id!==action.payload.id)
        },

        remove:(state,action)=>{
            return state=state.filter(item=>item.item.id!==action.payload.item.id)
        },
    }
})

export const WhistListActions= Wishlist.actions;

export default Wishlist;