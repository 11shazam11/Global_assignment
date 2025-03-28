import React, { useEffect, useRef } from 'react';
import { loginSelector, loginUser } from '../../Reducers/LoginRducers';   
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from "./login.module.css";

const Login = () => {
    const navigate = useNavigate(); //To navigate to allUsers
    const {isLoading,error,data} = useSelector(loginSelector); 
    const dispatch = useDispatch();

    const emailRef = useRef(); //Email Ref 
    const passwordRef = useRef();//Password Ref
    //Handel the input login form
    function handelSubmit(e){
        e.preventDefault();
        let data = {
            email:emailRef.current.value,
            password:passwordRef.current.value
        }
        dispatch(loginUser(data));  //Dispatch the async createAsyncThunk function
        emailRef.current.value = ""; //Set values to empty
        passwordRef.current.value = "";
    }
    //If successfull login the data will change and navigate to all Users list
    useEffect(()=>{
        if (data && data.token) {
          navigate("/allusers");
        }
    },[data])  
    
  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <h1>GLOBAL GROUPWARE</h1>
          <h1>Assingment</h1>
          {/* Demo Credentials */}
          <p>Email: eve.holt@reqres.in</p>
          <p>Password : cityslicka</p>
        </div>
        <div className={style.right}>
          <div className={style.error}>{error ? error : null}</div>
          <h1>Please Login </h1>
          <div className={style.formCon}>
            <form onSubmit={handelSubmit}>
              <input
                placeholder="Enter Email"
                ref={emailRef}
              />
              <input
                placeholder="Enter Password"
                ref={passwordRef}
              />
              <button disabled={isLoading}>
                {isLoading ? "Please Wait" : "LogIn"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login
