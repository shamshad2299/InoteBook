import React, { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import App from '../App';
//import Home from "../component/NotNeeded/Home"
import NavBar from '../component/NavBar';
import About from '../component/About';
//import AddNotes from '../component/AddNotes';
import SignUp from '../component/SignUp';
import Login from '../component/Login';
import HomePage from '../component/HomePage';
import Profile from '../component/Profile';
import OAuthCallback from '../component/OAuthCallback';
import PremiumNoteEditor from '../component/AddNote';
//import Login from '../component/Login';


function NotebookRouter() { 
  const [credentials , setCredentials] =  useState({name : "" ,email : "" , password : "" , cpassword : ""});

  let router  = createBrowserRouter([
{path : "/", element : <App/>  , children : [
   {path : "/", element :  <NavBar  ></NavBar> ,children : [
     {  path : "/" , element : <HomePage/>},
    // {  path : "/home" , element : <Home alert = {alert} showAlert ={showAlert} credentials ={credentials}  />},
    {  path : "/about" , element : <About/>},
     {  path : "/add-notes" , element : <PremiumNoteEditor/>},
     {  path : "/profile" , element : <Profile/>},
    // {  path : "/addnotes" , element : <AddNotes showAlert = {showAlert}/>},
    {  path : "/signup" , element : <SignUp  credentials = {credentials} setCredentials = {setCredentials}/>},
    {  path : "/login" , element : <Login  />},
     {path : "/oauth-callback" , element : <OAuthCallback  />}  
   ]},

]}
  ])
  return (
  <>
    <RouterProvider router={router}/>
  </>
  )
}

export default NotebookRouter;