import { createContext, useState, useContext, useEffect } from "react"
import apiClient from "../services/apiClient"

const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) =>{
const [user, setUser] = useState({})
const [initialized, setInitialized] = useState()
const [isProcessing, setIsProcessing] = useState(false)
const [error,setError]= useState()

// should make a request to log the user in
async function loginUser (credentials) {
    setIsProcessing(true)
    setError((e) => ({ ...e, form: null }))

    const {data, error} = await apiClient.loginUser({email: credentials.email, password: credentials.password});
    if (error) {
        setError((e) => ({ ...e, credentials: error }))
        const message = error?.response?.data?.error?.message
        setError((e) => ({ ...e, credentials: message ? String(message) : String(error) }))
        setIsProcessing(false);
        return false;
    }
    if (data?.user) {
        setUser(data.user);
        apiClient.setToken(data.token);
        setIsProcessing(false);
        return true;
    } 
}


// should make a request to sign the user up
async function signupUser (credentials) {
    setIsProcessing(true)
    setError((e) => ({ ...e, credentials: null }))

    if (credentials.passwordConfirm !== credentials.password) {
        setError((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
        setIsProcessing(false)
        return
    } else {
        setError((e) => ({ ...e, passwordConfirm: null }))
    }
    const {data, error} = await apiClient.signupUser({email: credentials.email, password: credentials.password, firstName: credentials.firstName, lastName: credentials.lastName, username: credentials.username});
    if (error) {
        setError((e) => ({ ...e, credentials: error }))
        const message = error?.response?.data?.error?.message
        setError((e) => ({ ...e, credentials: message ? String(message) : String(error) }))
        setIsProcessing(false);
        return false;
    }
    if (data?.user) {
        setUser(data.user);
        apiClient.setToken(data.token);
        setIsProcessing(false); 
        return true;
    }
    setIsProcessing(false); 
}


// should make a request to the `/auth/me` route to get the user's info
async function fetchUserFromToken () {
    const { data } = await apiClient.fetchUserFromToken()
    if (data) {
        setUser(data.user)
        setError(null)
    }
    setError("")
}

// function should remove the `lifetracker_token` from local storage 
// and refresh the page so that all user data is reset
async function logoutUser () {
    await apiClient.logoutUser()
    setUser({})
    setError(null)
}
      

const authValue = {
    user, 
    setUser, 
    initialized, 
    setInitialized,
    isProcessing,
    setIsProcessing,
    error,
    setError,
    loginUser,
    signupUser,
    fetchUserFromToken,
    logoutUser
}

return(
    <AuthContext.Provider value={authValue}>
        <>{children}</>
    </AuthContext.Provider>
)
}
    


export const useAuthContext = () => useContext(AuthContext);