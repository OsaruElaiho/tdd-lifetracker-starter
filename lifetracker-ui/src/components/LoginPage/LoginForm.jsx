import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./LoginForm.css"
import { useAuthContext } from "../../../contexts/auth"


export default function LoginForm(props) {
  const {error, setError, isProcessing,loginUser} = useAuthContext();
  const navigate = useNavigate()
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  })


  
  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setError((e) => ({ ...e, email: "Please enter a valid email. ❌" }))
      } else {
        setError((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
}

const handleOnSubmit = async (e) => {
  const valid = await loginUser(form);
  if (valid){
    navigate("/activity");
  }
}

  return (
    <div className="login-form">
        <div className="card">
            <h2>Login</h2>
            {Boolean(error?.form) && <span className="error">{error?.form}</span>}
            <br />
            <label htmlFor="email">Email</label>
            <input 
            className="form-input" 
            name="email" 
            type="email"  
            placeholder="user@gmail.com"
            value={form.email} 
            onChange={handleOnInputChange}
            />
            {error?.email && <span className="error">{error?.email}</span>}
            <label htmlFor="password">Password</label>
            <input 
            className="form-input" 
            name="password" 
            type="text" 
            placeholder="password"
            value={form.password} 
            onChange={handleOnInputChange}
            />
            {error?.password && <span className="error">{error?.password}</span>}
            <button className="submit-login" disabled={isProcessing} onClick={handleOnSubmit}>
                {isProcessing ? "Loading..." : "Login"}
            </button>   
            
            <div className="footer">
                <p>Don't have an account? Sign up <Link to="/register">here</Link></p>
            </div>     
        </div>
    </div>
  )
}