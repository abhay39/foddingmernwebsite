import { createSlice } from "@reduxjs/toolkit";

const ApiValue=createSlice({
    name: "ApiValue",
    initialState: "http://localhost:8000",
    reducers: {
        change:(state,payload)=>{
            state=payload.payload
        }
    }
})

export const apiValueActions = ApiValue.actions;

export default ApiValue;