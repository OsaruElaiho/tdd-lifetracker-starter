import { Link } from "react-router-dom"
import  NavLinks  from "components/Navbar/NavLinks" 
import logo from "components/Navbar/health.png"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="content">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" width={"50px"} />
                </Link>
            </div>
            <div className="links">
                <NavLinks/>
            </div>
        </div>
    </nav>
  )
}