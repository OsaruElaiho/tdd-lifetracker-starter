import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from ".../.../../contexts/auth"

export const useLoginForm = () => {
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
  
    useEffect(() => {
      // if user is already logged in,
      // redirect them to the home page
      if (user?.email) {
        navigate("/")
      }
    }, [user, navigate])

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
  
    const handleOnSubmit = async () => {
      setIsLoading(true)
  
      await handlers.loginUser(form)
  
      setIsLoading(false)
    }
  
    return {
      form,
      errors,
      isLoading,
      handleOnInputChange,
      handleOnSubmit,
    }
  }