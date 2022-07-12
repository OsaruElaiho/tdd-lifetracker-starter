import axios from "axios";
import API_BASE_URL from "../constants"
class ApiClient{
    // constructor function that accepts a single parameter - `remoteHostUrl`. 
    // The constructor should attach the `remoteHostUrl` parameter to a new instance
    // with `this.remoteHostUrl = remoteHostUrl`. It should also set `this.token = null`
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "lifetracker_token";
    }

    // method called `setToken` that accepts a single 
    // parameter - `token` and attaches it to the instance
    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token);
    }

    // Create a utility method called `request` that uses `axios` 
    // to issue HTTP requests
    async request({ endpoint, method = `GET`, data={}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if(this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios ({ url, method, data, headers })
            return {data: res.data, error:null}
        } catch(error) {
            console.error({ errorResponse: error.response})
            const message = error?.response?.data?.error?.message
            return { data: null, error: message || String(error)}
        }
    }

    // Add a `login` method that uses the `request` method to send an 
    // HTTP request to the `auth/login` endpoint
    async loginUser(credentials) {
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials})
    }


    // Add a `signup` method that uses the `request` method to send an HTTP 
    // request to the `auth/register` endpoint
    async signupUser(credentials) {
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials})
    }


    // Add a `fetchUserFromToken` method that uses the `request` method to send an HTTP
    // request to the `auth/me` endpoint
    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }
    
    async logoutUser() {
        this.setToken(null);
        localStorage.setItem(this.tokenName, "");
    }

    async createNutrition(nutrition) {
        console.log("createNutri met")
        return await this.request({endpoint: `nutrition/`, method: `POST`, data: nutrition})
    }

    async fetchNutrition() {
        return await this.request({endpoint: `nutrition/`, method: `GET`})
    }
    
    async listNutritionForUser() {
        return await this.request({endpoint: `nutrition`, method: `GET`})
    }

    async fetchCalorieStats() {
        return await this.request({endpoint: `activity`, method: `GET`})
    }

}
export default new ApiClient(API_BASE_URL || "http://localhost:3001")
