import React from "react"
import { Link } from "react-router-dom"
import "./NavLinks.css"

export default function NavLinks() {
  const [logState, setLogState] = React.useState(true)

  return (
    <div className="nav-links">
        <Link to="/activity">Activity</Link>
        <Link to="/nutrition">Nutrition</Link>
    {/* If a valid user is logged in */}
        <button className={logState ? "hidden logout-button": "logout-button"} onClick={() => {
        }}>Logout</button>
    {/* If no valid user is logged in */}
        <Link to="/login" className={logState ? "logout-button" : "hidden logout-button" } onClick={() => {
        }}>Login</Link>
        <Link id="sign-up" to="/register" className={logState ? "logout-button" : "hidden logout-button"} onClick={() => {
        }}>Sign Up</Link>
    </div>
  )
}