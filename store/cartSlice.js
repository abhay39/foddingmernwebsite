const { createSlice } = require("@reduxjs/toolkit");


function mergeArraysById(arr1, arr2) {
  const mergedArray = [...arr1];

  arr2.forEach(item => {
    const existingItemIndex = mergedArray.findIndex(existingItem => existingItem.idofItem === item.idofItem);

    if (existingItemIndex !== -1) {
      // If item already exists, update the quantity
      mergedArray[existingItemIndex].qtyOfItem += item.qtyOfItem;
    } else {
      // If item doesn't exist, add it to the array
      mergedArray.push(item);
    }
  });

  return mergedArray;
}


const Cartlist=createSlice({
    name: "Carts",
    initialState: [],
    reducers: {
      addToCart: (state, action) => {
        const existingItemIndex = state.findIndex(item => item.idofItem === action.payload.idofItem);
      
        if (existingItemIndex !== -1) {
          // If item already exists, update the quantity
          const updatedState = state.map((item, index) =>
            index === existingItemIndex ? { ...item, qtyOfItem: action.payload.qtyOfItem + item.qtyOfItem } : item
          );
      
          // Update the state with the new array
          state.length = 0;
          state.push(...updatedState);
      
          // Merge existing data from local storage with updatedState
          const existingLocalStorageData = JSON.parse(localStorage.getItem('carts')) || [];
          const mergedData = mergeArraysById(existingLocalStorageData, updatedState);
      
          localStorage.setItem("carts", JSON.stringify(mergedData));
        } else {
          // If item doesn't exist, add it to the array
          state.push(action.payload);
      
          // Merge existing data from local storage with the new item
          const existingLocalStorageData = JSON.parse(localStorage.getItem('carts')) || [];
          const mergedData = mergeArraysById(existingLocalStorageData, [action.payload]);
      
          localStorage.setItem("carts", JSON.stringify(mergedData));
        }
      },
      // Function to merge two arrays of objects based on a common identifier (idofItem)
          
        removeFromCart:(state,action)=>{
          console.log(action.payload);
            return state=state.filter(item=>item.idofItem!==action.payload.idofItem)
        }
    }
})

export const CartActions= Cartlist.actions;

export default Cartlist;