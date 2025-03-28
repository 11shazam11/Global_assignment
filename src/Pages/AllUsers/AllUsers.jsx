import React, { useEffect } from 'react';
import { getIntialState,userSelector,userAction } from '../../Reducers/UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import style from "./all.module.css";
import { useSnackbar } from 'notistack'; //for Snackbar


const AllUsers = () => {
    const {users,page,type,modal,notify} = useSelector(userSelector);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    //on Intital Render get the users og page 1
    useEffect(()=>{
        dispatch(getIntialState());
    },[]);
    //if notify has any messages the snackbar will appear
    useEffect(()=>{
      if(notify.msg){
      enqueueSnackbar(notify.msg, { variant:notify.variant });  //display the message
      dispatch(userAction.notifyMsg({msg:"",variant:"default"})) //set to default value for hte next message
      }
    },[notify])
    //set the page state based on next and prev
    function handelPage(direction){
        if(direction=="next"){
            dispatch(userAction.setPage(page+1)); //change the page number 
        }else if(direction == "prev"){
            dispatch(userAction.setPage(page - 1));
        }
        //call the get intial state
        dispatch(getIntialState()); //then get the data 
    }
  return (
    <>
      <div className={style.container}>
        <h1>All Users</h1>
        <div className={style.inner}>
          {/* Card Component for all users */}
          {users.map((user) => (
            <Card data={user} />
          ))}
        </div>
        <div className={style.btns}>
          {/* Prev Button */}
          <button disabled={page == 1} onClick={() => handelPage("prev")}>
            Prev
          </button>
          {/* Next Button */}
          <button disabled={page == 2} onClick={() => handelPage("next")}>
            Next
          </button>
        </div>
      </div>
      {/* Modal for update and delete pop up */}
      {modal ? <Modal /> : null}
    </>
  );
}

export default AllUsers
