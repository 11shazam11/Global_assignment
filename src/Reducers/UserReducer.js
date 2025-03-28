import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSnackbar } from "notistack";

//Get the user List based on page No
//there was no need of panigation as its alreasy available in the api
export const getIntialState = createAsyncThunk(
  "getUsers",
  async (data, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const { page } = state.userReducer;  //get the page number
      const response = await fetch(`https://reqres.in/api/users?page=${page}`); //set the get request
      if (!response.ok) {
        return thunkApi.rejectWithValue("Server Issue");
      }
      const resData = await response.json(); //get the data and store in the state
      thunkApi.dispatch(userAction.setPage(resData.page));
      return resData.data;
    } catch (er) {}
  }
);

//For updating users
export const updateUser = createAsyncThunk("update", async (data, thunkApi) => {
  try {
    const { id, name, job } = data; //get the params from the dispathcer
    const response = await axios.put(`https://reqres.in/api/users/${id}`, {
      name,
      job,
    });
    //close the modal (update user modal)
    thunkApi.dispatch(userAction.closeModal());
    return {
      data: response.data,
      notify: { msg: "User Updated", variant: "success" }, 
      // send data and notify message
    };

  } catch (error) {
    return thunkApi.rejectWithValue(
      error.response?.data || "An error occurred"
    );
  }
});
// Delete User

export const delUser = createAsyncThunk("delete",async (id,thunkApi)=>{
  try {
    const response = await axios.delete(`https://reqres.in/api/users/${id}`);
    // Close the model afeter deletion
    thunkApi.dispatch(userAction.closeModal());
    return {
      data:response.data,
      notify:{msg:"User Deleted",variant:"error"}
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error)
  }
})

const INITIAL_STATE = {
  users: [],  //contains the user Data  in panigation way 
  selected:null, //when selected for deletion or update
  page: 1,  //keep tracks of page
  isLoadin: false, 
  error: null,
  modal:false,
  type:null,
  notify:{msg:"",variant:"default"}
};
const userSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    setPage: (state, action) => {  //sets the current page number
      state.page = action.payload;
    },
    openModal:(state,action)=>{
      state.modal = true;                 //Opens the modal
      state.type = action.payload.type;
      state.selected = action.payload.data;
    },
    closeModal:(state,action)=>{            //Close the model
      state.modal = false;
      state.type = null;
      state.selected = null;
    },
    notifyMsg:(state,action)=>{             //onchanging snackbar will trigger
      state.notify = action.payload;         //sets up the notify message
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getIntialState.fulfilled,(state,action)=>{ //on fufilll store the data in users
        state.users = action.payload;
    }).addCase(updateUser.pending,(state,action)=>{     //on pending set the isLoading true
      state.isLoadin = true
    }).addCase(updateUser.fulfilled,(state,action)=>{
      state.isLoadin = false;                           
      state.notify = action.payload.notify; 
    }).addCase(delUser.pending,(state,action)=>{
      state.isLoadin = true
    }).addCase(delUser.fulfilled,(state,action)=>{
      state.isLoadin =false;
      state.notify = action.payload.notify
    })
  }
});

export const userReducer = userSlice.reducer;

export const userAction = userSlice.actions;

export const userSelector = (state) => state.userReducer;
