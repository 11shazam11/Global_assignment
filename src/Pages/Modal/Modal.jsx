import React, { useState } from "react";
import style from "./modal.module.css";
import {
  userSelector,
  updateUser,
  delUser,
  userAction,
} from "../../Reducers/UserReducer";
import { useDispatch, useSelector } from "react-redux";

const Modal = () => {
  const { type, selected,isLoadin } = useSelector(userSelector);
  const [name, setName] = useState(selected.first_name || "");
  const [job, setJob] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      id: selected.id,
      name,
      job,
    };
    dispatch(updateUser(data));
  }

  function handleDelete(decision) {
    if (decision === "del") {
      dispatch(delUser(selected.id));
    }else{
      dispatch(userAction.closeModal());
    }
    
  }

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        {type === "update" ? (
          <div className={style.updateForm}>
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
              <div className={style.btnGroup}>
                <button type="submit" className={style.updateBtn} disabled={isLoadin}>
                  Update
                </button>
                <button
                  type="button"
                  className={style.cancelBtn}
                  onClick={() => handleDelete("cancel")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className={style.deleteConfirm}>
            <h2>Are you sure?</h2>
            <div className={style.btnGroup}>
              <button
                className={style.cancelBtn}
                onClick={() => handleDelete("cancel")}
              >
                Cancel
              </button>
              <button
                className={style.deleteBtn}
                onClick={() => handleDelete("del")}
                disabled={isLoadin}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
