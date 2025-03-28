import { useState } from 'react'
import './App.css';
//Elements
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import AllUsers from './Pages/AllUsers/AllUsers';
import { SnackbarProvider } from 'notistack';
//Redux Store Porvider 
import { Provider } from 'react-redux';
//Redux Store
import { store } from './store';
//For Navigating through pages
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  
  //Navigation Routes 
  const routes = createBrowserRouter([
    {path:"/",element:<Home/>,children:[
      {index:true,element:<Login/>},
      {path:"/allusers",element:<AllUsers/>}
    ]}
  ])

  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={1500}
    >
      <Provider store={store}>
        <RouterProvider router={routes}></RouterProvider>
      </Provider>
    </SnackbarProvider>
  );
}

export default App
