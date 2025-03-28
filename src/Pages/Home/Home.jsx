import React from 'react'
import { Outlet } from 'react-router-dom';

// on Path = "/" Home will Render Rest all the components are childrens to Home
const Home = () => {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Home
