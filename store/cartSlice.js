const { createSlice } = require("@reduxjs/toolkit");

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

              console.log(updatedState);
              localStorage.setItem("carts", JSON.stringify([...updatedState]));
            } else {
              // If item doesn't exist, add it to the array
              state.push(action.payload);
              localStorage.setItem("carts", JSON.stringify([...state]));
            }

          },
          
        removeFromCart:(state,action)=>{
          console.log(action.payload);
            return state=state.filter(item=>item.idofItem!==action.payload.idofItem)
        }
    }
})

export const CartActions= Cartlist.actions;

export default Cartlist;