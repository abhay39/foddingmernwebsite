const { createSlice } = require("@reduxjs/toolkit");

const Wishlist=createSlice({
    name: "Wishlist",
    initialState: [],
    reducers: {
        addToWishlist:(state,action)=>{
            state.push(action.payload)
            console.log(state.length)
        },
        removeFromWishlist:(state,action)=>{
            return state=state.filter(item=>item.id!==action.payload.id)
        }
    }
})

export const WhistListActions= Wishlist.actions;

export default Wishlist;