const { createSlice } = require("@reduxjs/toolkit");

const UserSlice=createSlice({
    name: "User",
    initialState: '',
    reducers: {
        addUserDetails:(state,actions)=>{
            state=actions.payload;
            return state;
        }
    }        
})

export const UserActions = UserSlice.actions;

export default UserSlice;