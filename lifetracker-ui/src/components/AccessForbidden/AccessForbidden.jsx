import * as React from "react";
import logo from "components/AccessForbidden/access_denied.png"
import "./AccessForbidden.css";


export default function AccessForbidden() {
    return ( 
    <div className="access-forbidden">
        <div className="content">
            <img src={logo} alt="logo" className="logo-img" />
            <div className="message">
                <h1>Access Denied!</h1>
                <h1>Login or Signup to gain access!</h1>
            </div>
        </div>
    </div>);
}