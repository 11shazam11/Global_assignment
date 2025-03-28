// Card Component
import React from "react";
import styled from "styled-components";
import up from "./re.png";
import del from "./del.png";
import { userAction,userSelector} from "../../Reducers/UserReducer";
import { useDispatch, useSelector } from "react-redux";

const Card = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const {type,modal} = useSelector(userSelector);

    
    function om(type){
      dispatch(userAction.openModal({type,data}));
     
    }
  return (
    <StyledWrapper>
      <div className="card-client">
        <div className="user-picture">
          <img src={data.avatar} />
        </div>
        <p className="name-client">
          {" "}
          {data.first_name}
          <span>{data.email}</span>
        </p>
        <div className="social-media">
          <a href="#">
            <img src={up} width="30" height="30" onClick={() => om("update")} />
            <span className="tooltip-social">Update</span>
          </a>

          <a href="#">
            <img
              src={del}
              width="30"
              height="30"
              onClick={() => om("delete")}
            />
            <span className="tooltip-social">Delete</span>
          </a>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card-client {
    background:rgb(65, 84, 81);
    min-width: 13rem;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 20px;
    padding-right: 20px;
    border: 4px solid #7cdacc;
    box-shadow: 0 6px 10px rgba(207, 212, 222, 1);
    border-radius: 10px;
    text-align: center;
    color: #fff;
    font-family: "Poppins", sans-serif;
    transition: all 0.3s ease;
  }

  .card-client:hover {
    transform: translateY(-10px);
  }

  .user-picture {
    overflow: hidden;
    object-fit: cover;
    width: 5rem;
    height: 5rem;
    border: 4px solid #7cdacc;
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .user-picture svg {
    width: 2.5rem;
    fill: currentColor;
  }

  .name-client {
    margin: 0;
    margin-top: 20px;
    font-weight: 600;
    font-size: 18px;
  }

  .name-client span {
    display: block;
    font-weight: 200;
    font-size: 16px;
  }

  .social-media:before {
    content: " ";
    display: block;
    width: 100%;
    height: 2px;
    margin: 20px 0;
    background: #7cdacc;
  }

  .social-media a {
    position: relative;
    margin-right: 15px;
    text-decoration: none;
    color: inherit;
  }

  .social-media a:last-child {
    margin-right: 0;
  }

  .social-media a svg {
    width: 1.1rem;
    fill: currentColor;
  }

  /*-- Tooltip Social Media --*/
  .tooltip-social {
    background: #262626;
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    padding: 0.5rem 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 600;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, -90%);
    transition: all 0.2s ease;
    z-index: 1;
  }

  .tooltip-social:after {
    content: " ";
    position: absolute;
    bottom: 1px;
    left: 50%;
    border: solid;
    border-width: 10px 10px 0 10px;
    border-color: transparent;
    transform: translate(-50%, 100%);
  }

  .social-media a .tooltip-social:after {
    border-top-color: #262626;
  }

  .social-media a:hover .tooltip-social {
    opacity: 1;
    transform: translate(-50%, -130%);
  }
`;

export default Card;
