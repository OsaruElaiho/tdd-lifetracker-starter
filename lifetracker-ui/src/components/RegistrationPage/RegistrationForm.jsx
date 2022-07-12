import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./RegistrationForm.css"
import apiClient from "../../../services/apiClient"
import axios from "axios"
import { useAuthContext } from "../../../contexts/auth"


export default function RegistrationForm() {
  const {signupUser, error, setError, isProcessing} = useAuthContext();
  const navigate = useNavigate()
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
              setError((e) => ({ ...e, passwordConfirm: "passwords don't match ❌" }))
            } else {
              setError((e) => ({ ...e, passwordConfirm: null }))
            }
        }
        if (event.target.name === "passwordConfirm") {
            if (form.password && form.password !== event.target.value) {
              setError((e) => ({ ...e, passwordConfirm: "passwords don't match ❌ " }))
            } else {
              setError((e) => ({ ...e, passwordConfirm: null }))
            }
        }
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
      const valid = await signupUser(form);
      if (valid){
        navigate("/activity");
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
                    {error?.email && <span className="error">{error?.email}</span>}
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
                    {error?.username && <span className="error">{error?.username}</span>}
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
                        {error?.firstName && <span className="error">{error?.firstName}</span>}
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
                        {error?.lastName && <span className="error">{error?.lastName}</span>}
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
                    {error?.password && <span className="error">{error?.password}</span>}
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
                    {error?.passwordConfirm && <span className="error">{error?.passwordConfirm}</span>}
                </div>
                <div className="input-field">
                    <button className="submit-registration" disabled={isProcessing} onClick={handleOnSubmit}>
                        {isProcessing ? "Loading..." : "Create Account"}
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