import ApiValue from "./apiSlice";

const { configureStore } = require("@reduxjs/toolkit");

const FoodieStore=configureStore({
    reducer:{
        APIReducer:ApiValue.reducer,
    }
})

export default FoodieStore;