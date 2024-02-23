import ApiValue from "./apiSlice";
import Cartlist from "./cartSlice";
import UserSlice from "./userSlice";
import Wishlist from "./whistListSlice";

const { configureStore } = require("@reduxjs/toolkit");

const FoodieStore=configureStore({
    reducer:{
        APIReducer:ApiValue.reducer,
        WishlistReducer:Wishlist.reducer,
        CartReducer:Cartlist.reducer,
        UserReducer:UserSlice.reducer,
    }
})

export default FoodieStore;