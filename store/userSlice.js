const { createSlice } = require("@reduxjs/toolkit");

const UserSlice=createSlice({
    name: "User",
    initialState: '',
    reducers: {
        addUserDetails:(state,actions)=>{
            console.log(actions.payload)
            return state=actions.payload
        }
    }        
})

export const UserActions = UserSlice.actions;

export default UserSlice;