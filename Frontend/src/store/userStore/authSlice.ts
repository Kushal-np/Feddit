import {createSlice} from "@reduxjs/toolkit";
import type { AuthState, Retard } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";
const initialState : AuthState = ({
    retard :null  , 
    loading : false , 
    error:null
});

const authSlice = createSlice({
    name:"auth" , 
    initialState , 
    reducers:{
        setUser : (state , action:PayloadAction<Retard | null >) =>{
            state.retard  = action.payload ; 
        },
        clearUser : (state) =>{
            state.retard = null ; 
        }
    }
})

export const {setUser , clearUser} =  authSlice.actions ; 
export default authSlice.reducer;