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
        setRetard : (state , action:PayloadAction<Retard | null >) =>{
            state.retard  = action.payload ; 
        },
        clearRetard : (state) =>{
            state.retard = null ; 
        }
    }
})

export const {setRetard , clearRetard} =  authSlice.actions ; 
export default authSlice.reducer;