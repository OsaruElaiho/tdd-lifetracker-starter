import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./RegistrationForm.css"
import axios from "axios"

export default function RegistrationForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const [form, setForm] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  })

    const handleOnInputChange = (event) => {
        if (event.target.name === "password") {
            if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
              setErrors((e) => ({ ...e, passwordConfirm: "passwords don't match ❌" }))
            } else {
              setErrors((e) => ({ ...e, passwordConfirm: null }))
            }
        }
        if (event.target.name === "passwordConfirm") {
            if (form.password && form.password !== event.target.value) {
              setErrors((e) => ({ ...e, passwordConfirm: "passwords don't match ❌ " }))
            } else {
              setErrors((e) => ({ ...e, passwordConfirm: null }))
            }
        }
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") === -1) {
              setErrors((e) => ({ ...e, email: "Please enter a valid email. ❌" }))
            } else {
              setErrors((e) => ({ ...e, email: null }))
            }
        }
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const signupUser = async () => {
      setIsLoading(true)
      setErrors((e) => ({ ...e, form: null }))
  
      if (form.passwordConfirm !== form.password) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
        setIsLoading(false)
        return
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    
        try {
          const res = await axios.post("http://localhost:3001/auth/register", {
            email: form.email,
            username: form.username,
            firstName: form.firstName,
            lastName: form.lastName,
            password: form.password
          })
    
          if (res?.data?.user) {
            // setAppState(res.data)
            setIsLoading(false)
            navigate("/login")
          } else {
            setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
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
    <div className="registration-form">
        <div className="card">
            <h2>Register</h2>
            <br />
            <div className="form">
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input 
                    className="form-input" 
                    name="email" 
                    type="email"  
                    placeholder="Enter a valid email"
                    value={form.email} 
                    onChange={handleOnInputChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="input-field">
                    <label htmlFor="username">Username</label>
                    <input
                    className="form-input"
                    type="text"
                    name="username"
                    placeholder="username"
                    value={form.username}
                    onChange={handleOnInputChange}
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div className="split-input-field">
                    <div className="input-field">
                        <input
                        className="form-input"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleOnInputChange}
                        />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="input-field">
                        <input
                        className="form-input"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleOnInputChange}
                        />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                </div>
                <div className="input-field">
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
                </div>
                <div className="input-field">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input 
                    className="form-input" 
                    name="passwordConfirm" 
                    type="text" 
                    placeholder="confirm password"
                    value={form.passwordConfirm} 
                    onChange={handleOnInputChange}
                    />
                    {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
                </div>
                <div className="input-field">
                    <button className="submit-registration" disabled={isLoading} onClick={signupUser}>
                        {isLoading ? "Loading..." : "Create Account"}
                    </button>
                </div>
                <div className="footer">
                    <p>Already have an account? Login <Link to="/login">here</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}