import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import {useAuthContext } from "../../../contexts/auth";
import "./NavLinks.css"


export default function NavLinks(props) {
  const {user, logoutUser} = useAuthContext();
  const navigate = useNavigate();
  const handleOnLogout = async () => {
    logoutUser();
    navigate("/")
  }

  return (
    <div className="nav-links">
        <Link to="/activity">Activity</Link>
        <Link to="/nutrition">Nutrition</Link>
      {/* If a valid user is logged in vs If no valid user is logged in */}  
      {user.email ?  <div className ="nav-links"><Link to = "/" id="logout"><NavLink  handleOnLogout={handleOnLogout}/></Link></div> :
        <div className="nav-links" >
          <Link id="login" to="/login" className="login" >Login</Link>
          <Link id="sign-up" to="/register" className={"signup"}>Sign Up</Link>
      </div>
      }
    
    </div>
  )
}
 
export function NavLink(props) {
  return (
    <div className="nav-links">{
      <button id ="logout" className="logoutBtn" onClick={props.handleOnLogout}>Logout</button>
    }</div>
  )
}
