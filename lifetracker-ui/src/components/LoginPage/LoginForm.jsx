import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./LoginForm.css"
import axios from "axios"

export default function LoginForm({ setAppState }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  })

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email. ❌" }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const loginUser = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors((e) => ({ ...e, form: null }))

    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, form)
      if (res?.data) {
        //setAppState(res.data)
        setIsLoading(false)
        navigate("/activity")
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination ❌" }))
        setIsLoading(false)
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
      setIsLoading(false)
    }
  }

  return (
    <div className="login-form">
        <div className="card">
            <h2>Login</h2>
            {Boolean(errors.form) && <span className="error">{errors.form}</span>}
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
            {errors.email && <span className="error">{errors.email}</span>}
            <label htmlFor="password">Password</label>
            <input 
            className="form-input" 
            name="password" 
            type="text" 
            placeholder="password"
            value={form.password} 
            onChange={handleOnInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
            <button className="submit-login" disabled={isLoading} onClick={loginUser}>
                {isLoading ? "Loading..." : "Login"}
            </button>   
            
            <div className="footer">
                <p>Don't have an account? Sign up <Link to="/register">here</Link></p>
            </div>     
        </div>
    </div>
  )
}