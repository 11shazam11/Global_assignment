import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "react-router-dom";



//Async thnuk to deal with async operations
export const loginUser = createAsyncThunk("loginUser",async (data,thunkApi)=>{
    console.log(data);
    
    //sending a post request with user email nad password credential (data)
    try{
        const response = await fetch("https://reqres.in/api/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,           //Body content
            password: data.password,
          }),
        });
        //get the data
        const resData = await response.json();
        if(!response.ok){
           return  thunkApi.rejectWithValue(resData.error||"User not found");
        }
        localStorage.setItem("userLogin",JSON.stringify(resData));
        return resData;
    }catch(e){
        thunkApi.rejectWithValue(e)
    }
    
})
const INITIAL_STATE = {
    isLoggedIn:false, //in future for persistent login feature
    isLoading:false, //used to loading elements
    error:null,  //If any error server issue
    data:null  //stores the data of logged in user
}

//Login Slice
const loginSlice = createSlice({
    name:"login",
    initialState:INITIAL_STATE,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state,action)=>{
            state.isLoading=true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.error = action.payload;
        })
    }
    
});

//Exporting reducer to registter in store
export const loginReducer = loginSlice.reducer;
//Actions to perform in component
export const loginActions = loginSlice.actions;
//Selector to acssess state to display name of user
export const loginSelector = (state)=> state.loginReducer;