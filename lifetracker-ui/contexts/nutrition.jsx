import {createContext, useState, useContext, useEffect} from 'react'
import apiClient from "../services/apiClient";

const NutritionContext = createContext(null);

export const NutritionContextProvider = ({children}) => {
const [nutritions, setNutritions] = useState([]);
const [initialized, setInitialized] = useState();
const [isProcessing, setIsProcessing] = useState();
const [error, setError] = useState({nutrition: ""});
// track state of user being logged in
const [loggedInStatus, setLoggedInStatus] = useState(false);

useEffect(() => {
    // should make a `GET` request to the `/nutritions` endpoint
    // If there is an error with the request, it should set a message as the `error` state variable
    const getNutrition = async () => {
        const {data, err} = await apiClient.fetchNutrition();
        // If all goes well, should set the data as the `nutritions` state variable
        if (data){
            setNutritions(data.nutritions);
        } 
        // If there is an error with the request, it should set a message as the `error` state variable
        if (err){
            setError(err);
        } 
    }

    getNutrition();
    
    // Regardless, at the end, set the `isLoading` state variable 
    // to `false` and the `initialized` state variable to `true`
    setIsProcessing(false)
    setInitialized(true)
}, [])


async function createNutrition(credentials) {
    console.log("create nutrition reached")
    setIsProcessing(true)
    setError((e) => ({ ...e, credentials: null }))
    const create = async () => {
    const {data, err} = await apiClient.createNutrition(credentials);
    if (data) {
        console.log("data recieved")
        return true;
    } else if (err) {
        return false;
    }
    }
    const valid = await create();
    setIsProcessing(false)
    return valid;
}

// pass an object containing all the state 
// variables to the `value` prop of the `NutritionContext.Provider` component
const nutriValue = {
    nutritions, 
    setNutritions, 
    initialized, 
    setInitialized,
    isProcessing,
    setIsProcessing,
    error,
    setError,
    createNutrition
}

return (
    <NutritionContext.Provider value={nutriValue}>
        <>{children}</>
    </NutritionContext.Provider>
)

}

// Create and export a `useNutritionContext` hook that calls the `React.useContext` hook 
// with the newly created `NutritionContext` and returns it
export const useNutritionContext = () => useContext(NutritionContext)