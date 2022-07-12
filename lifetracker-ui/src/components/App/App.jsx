import * as React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Landing from "../Landing/Landing"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import AccessForbidden from "../AccessForbidden/AccessForbidden"
import NotFound from "../NotFound/NotFound"
import apiClient from "../../../services/apiClient"
import { AuthContextProvider, useAuthContext } from "../../../contexts/auth"
import "./App.css"
import {useState, useEffect} from "react"


// create an `AppContainer` component that wraps the `App` component 
// with the `AuthContextProvider` component 
// Export the `AppContainer` component by default instead of the `App`
export default function AppContainer () {
  return (
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  )
}

function App (){
  const {user, setUser, error, setError} = useAuthContext();
  
  useEffect(() => {
    const fetchUser = async () => {
      const {data, err} = await apiClient.fetchUserFromToken()
      if (data) setUser(data.user)
      if (err) setError(err)
    }

    const token = localStorage.getItem("lifetracker_token");
    if(token) {
      apiClient.setToken(token)
      fetchUser()
    }
  }, [])

  

  
  return (
    <div className="app">
    <React.Fragment>{
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={user.email ? <Navigate to="/activity"/> : <LoginPage/>} />
          <Route path="/register" element={user.email ? <Navigate to="/activity"/> : <RegistrationPage/>}/>
          <Route path="/activity" element={!user.email ? <AccessForbidden/> : <ActivityPage/>} />
          <Route path="/nutrition/*" element={!user.email ? <AccessForbidden/> : <NutritionPage/>} />
          <Route path="*" element={<NotFound/>} /> 
        </Routes>
      </BrowserRouter>
    }</React.Fragment>
    </div>
  )
}
